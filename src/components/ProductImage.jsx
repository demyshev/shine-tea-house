"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImage({
  src,
  alt,
  width = 400,
  height = 400,
  className,
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc("/images/placeholder.jpg")}
    />
  );
}
