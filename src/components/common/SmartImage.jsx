import Image from "next/image";

export default function SmartImage({ src, alt, className, sizes = "100vw", priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
