import React, { useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  image: {
    src: string;
    title: string;
    description: string;
  };
  onClose: () => void;
}

const ImageWithZoomModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative max-w-full max-h-full overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white text-black rounded-full px-3 py-1 font-bold shadow-md hover:bg-gray-200 z-50"
        >
          ✕
        </button>

        <div className="relative w-[90vw] h-auto max-h-[80vh] mx-auto overflow-hidden">
          <Image
            src={image.src}
            alt={image.title}
            layout="responsive"
            width={1200}
            height={800}
            className="rounded-lg object-contain"
          />
          <div className="text-white mt-4 text-center">
            <h2 className="text-2xl font-bold">{image.title}</h2>
            <p className="text-sm">{image.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageWithZoomModal;
