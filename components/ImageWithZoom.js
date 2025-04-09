import Image from 'next/image';
import React from 'react';

interface ImageWithZoomProps {
  image: {
    src: string;
    title: string;
    description: string;
  };
}

const ImageWithZoom: React.FC<ImageWithZoomProps> = ({ image }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden group">
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105 rounded-xl"
        />
      </div>
    </div>
  );
};

export default ImageWithZoom;
