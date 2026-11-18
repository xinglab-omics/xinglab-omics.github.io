import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicDir = path.join(root, "public");
const recipes = {
  branding: { widths: [36, 64, 80, 96, 128, 160, 192, 288], format: "png", quality: 90 },
  profiles: { widths: [128, 256], quality: 78, avifQuality: 52, square: true },
  research: { widths: [384, 480, 704, 832, 1024, 1280], quality: 73, avifQuality: 46 },
  papers: { widths: [480, 832, 1024, 1440], quality: 86, avifQuality: 60 },
  news: { widths: [220, 440, 704, 768, 1024, 1440], quality: 83, avifQuality: 50 },
  "quiz/photos": { widths: [320, 640, 800], quality: 74 }
};
const manifest = {};

for (const [folder, recipe] of Object.entries(recipes)) {
  const directory = path.join(publicDir, "images", folder);
  const encoders = recipe.format === "png"
    ? { png: { palette: true, quality: recipe.quality, effort: 8 } }
    : { webp: { quality: recipe.quality, effort: 5, smartSubsample: true } };
  if (recipe.avifQuality) {
    encoders.avif = { quality: recipe.avifQuality, effort: 4, chromaSubsampling: "4:4:4" };
  }
  const filenames = (await readdir(directory)).filter(name => /\.(png|jpe?g|webp|avif)$/i.test(name)).sort();
  for (const filename of filenames) {
    const input = await readFile(path.join(directory, filename));
    const metadata = await sharp(input).metadata();
    const { width, height } = metadata.autoOrient;
    const available = recipe.square ? Math.min(width, height) : width;
    const widths = [...new Set(recipe.widths.map(target => Math.min(target, available)))];
    const hash = createHash("sha256").update(input).update(JSON.stringify(recipe)).digest("hex").slice(0, 12);
    const basename = `${path.parse(filename).name}-${hash}`;
    const prefix = `/image-variants/${folder}/${encodeURIComponent(basename)}`;
    const outputDir = path.join(publicDir, "image-variants", folder);
    await mkdir(outputDir, { recursive: true });
    for (const target of widths) {
      const resized = sharp(input)
        .autoOrient()
        .resize({ width: target, height: recipe.square ? target : undefined, fit: "cover" });
      for (const [format, options] of Object.entries(encoders)) {
        const destination = path.join(outputDir, `${basename}-${target}.${format}`);
        if (existsSync(destination)) continue;
        const temp = `${destination}.${process.pid}.tmp`;
        await resized.clone().toFormat(format, options).toFile(temp);
        await rename(temp, destination);
      }
    }
    manifest[`/images/${folder}/${filename}`] = {
      prefix, widths, width: available, height: recipe.square ? available : height,
      format: recipe.format, avif: Boolean(recipe.avifQuality)
    };
  }
}

const manifestPath = path.join(root, "lib", "image-manifest.json");
const json = JSON.stringify(manifest, null, 2) + "\n";
if (await readFile(manifestPath, "utf8").catch(() => "") !== json) {
  const temp = `${manifestPath}.${process.pid}.tmp`;
  await writeFile(temp, json);
  await rename(temp, manifestPath);
}
