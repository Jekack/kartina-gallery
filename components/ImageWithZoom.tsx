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
      title="Натисни, щоб збільшити"
      className="cursor-[zoom-in] hover:scale-105 transition-transform duration-300 shadow-lg rounded-xl w-full h-auto"
    />
  );
}
