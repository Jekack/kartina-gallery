// components/ImageWithZoom.tsx
import React from "react";
import Image from "next/image";

type Props = {
  image: {
    url: string;
    title: string;
  };
  zoomed: boolean;
  setZoomed: (value: boolean) => void;
};

export default function ImageWithZoom({ image, zoomed, setZoomed }: Props) {
  const handleClick = () => {
    setZoomed(!zoomed);
  };

  return (
    <div className={`transition-transform duration-300 ease-in-out ${zoomed ? "scale-150" : "scale-100"}`}>
      <Image
        src={image.url}
        alt={image.title}
        width={800}
        height={600}
        onClick={handleClick}
        className="cursor-zoom-in rounded-lg shadow-lg"
        priority
      />
    </div>
  );
}
