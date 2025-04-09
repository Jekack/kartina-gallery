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
    <div className="flex items-center justify-center h-full p-4">
      <div className="relative w-full max-w-3xl max-h-[70vh] overflow-hidden group flex items-center justify-center">
        <img
          src={image.src}
          alt={image.title}
          className="w-auto h-full max-h-[70vh] object-contain transition-transform duration-500 group-hover:scale-105 rounded-xl"
        />
      </div>
    </div>
  );
};

export default ImageWithZoom;
