import type { ComponentProps } from "react";
import { preload } from "react-dom";
import imageManifest from "@/lib/image-manifest.json";
import { withBasePath } from "@/lib/site-paths";

type Rendition = { prefix: string; widths: number[]; width: number; height: number; format?: string; avif?: boolean };
const renditions: Record<string, Rendition> = imageManifest;

type SiteImageProps = Omit<ComponentProps<"img">, "src" | "alt" | "srcSet"> & {
  src: string;
  alt: string;
};

export function SiteImage({ src, alt, sizes, width, height, loading = "lazy", ...props }: SiteImageProps) {
  const image = renditions[src];
  const fallbackFormat = image?.format ?? "webp";
  const variant = (w: number, format: string) => withBasePath(`${image.prefix}-${w}.${format}`);
  const srcSet = (format: string) => image.widths.map(w => `${variant(w, format)} ${w}w`).join(", ");
  const img = (
    <img
      {...props}
      src={image ? variant(image.widths[image.widths.length - 1], fallbackFormat) : withBasePath(src)}
      srcSet={image ? srcSet(fallbackFormat) : undefined}
      sizes={image ? sizes : undefined}
      width={width ?? image?.width}
      height={height ?? image?.height}
      alt={alt}
      loading={loading}
      decoding="async"
    />
  );
  if (!image?.avif) return img;

  const avifSrcSet = srcSet("avif");
  if (loading === "eager" && props.fetchPriority === "high") {
    preload(variant(image.widths[image.widths.length - 1], "avif"), {
      as: "image", type: "image/avif", imageSrcSet: avifSrcSet, imageSizes: sizes, fetchPriority: "high"
    });
  }
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      {img}
    </picture>
  );
}
