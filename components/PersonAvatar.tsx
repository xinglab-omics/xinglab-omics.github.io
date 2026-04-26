import Image from "next/image";

type PersonAvatarProps = {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeClasses = {
  sm: "size-14 text-base",
  md: "size-16 text-lg",
  lg: "size-24 text-3xl",
  xl: "size-32 text-4xl"
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

export function PersonAvatar({ name, image, size = "md" }: PersonAvatarProps) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-paper font-semibold text-fudan ${sizeClasses[size]}`}
    >
      {image ? (
        <Image
          src={image}
          alt={`${name} profile photo`}
          fill
          sizes={size === "xl" ? "128px" : size === "lg" ? "96px" : "64px"}
          className="object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
