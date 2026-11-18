import { SiteImage } from "@/components/SiteImage";

type PersonAvatarProps = {
  name: string;
  image?: string;
  priority?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const avatarSizes = {
  xs: { classes: "size-9 text-xs", width: 36 },
  sm: { classes: "size-14 text-base", width: 56 },
  md: { classes: "size-16 text-lg", width: 64 },
  lg: { classes: "size-24 text-3xl", width: 96 },
  xl: { classes: "size-32 text-4xl", width: 128 }
};

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function PersonAvatar({ name, image, priority = false, size = "md" }: PersonAvatarProps) {
  const avatar = avatarSizes[size];
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-paper font-semibold text-fudan ${avatar.classes}`}
    >
      {image ? (
        <SiteImage
          src={image}
          alt={`${name} profile photo`}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          sizes={`${avatar.width}px`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
