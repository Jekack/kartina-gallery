// components/ImageWithZoom.tsx
import React from "react";

interface ImageProps {
  image: {
    src: string;
    title: string;
    description: string;
  };
  onClick: () => void;
}

export default function ImageWithZoom({ image, onClick }: ImageProps) {
  return (
    <img
      src={image.src}
      alt={image.title}
      onClick={onClick}
      className="cursor-pointer hover:scale-105 transition duration-300 w-full h-auto"
    />
  );
}
