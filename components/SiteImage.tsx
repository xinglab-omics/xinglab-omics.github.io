import type { ComponentProps } from "react";
import imageManifest from "@/lib/image-manifest.json";
import { withBasePath } from "@/lib/site-paths";

type Rendition = { prefix: string; widths: number[]; width: number; height: number };
const renditions: Record<string, Rendition> = imageManifest;

type SiteImageProps = Omit<ComponentProps<"img">, "src" | "alt" | "srcSet"> & {
  src: string;
  alt: string;
};

export function SiteImage({ src, alt, sizes, width, height, loading = "lazy", ...props }: SiteImageProps) {
  const image = renditions[src];
  const variant = (w: number) => withBasePath(`${image.prefix}-${w}.webp`);
  return (
    <img
      {...props}
      src={image ? variant(image.widths[image.widths.length - 1]) : withBasePath(src)}
      srcSet={image?.widths.map(w => `${variant(w)} ${w}w`).join(", ")}
      sizes={image ? sizes : undefined}
      width={width ?? image?.width}
      height={height ?? image?.height}
      alt={alt}
      loading={loading}
      decoding="async"
    />
  );
}
