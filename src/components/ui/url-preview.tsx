/* eslint-disable @next/next/no-img-element */
"use client";
import { encode } from "qss";

type UrlPreviewProps = {
  url: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
};

export const UrlPreview = ({
  url,
  width = 300,
  height = 200,
  quality = 80,
  className,
}: UrlPreviewProps) => {
  const src = `https://api.microlink.io/?${encode({
    url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    "viewport.width": width * 3,
    "viewport.height": height * 3,
    "image.format": "png",
    "image.quality": quality,
  })}`;

  return (
    <img
      src={src}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "cover", borderRadius: 8 }}
      alt="URL preview"
    />
  );
};