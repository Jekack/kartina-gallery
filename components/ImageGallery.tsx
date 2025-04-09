import React, { useState } from 'react';
import ImageWithZoom from './ImageWithZoom'; // імпортуй твій компонент

const images = [
  {
    src: '/images/pixel.png',
    title: 'Піксельна',
    description: 'Піксельна краса цифрової епохи — ретро та майбутнє в одному кадрі.',
  },
  {
    src: '/images/watercolor.png',
    title: 'Акварель',
    description: 'Ніжні відтінки природи, втілені у м’яких мазках акварелі.',
  },
  // додай інші картини
];

const ImageGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-xl max-w-5xl w-full">
        <ImageWithZoom
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <div className="text-center mt-4 text-white">
          <h2 className="text-xl font-bold">{images[currentIndex].title}</h2>
          <p>{images[currentIndex].description}</p>
          <p className="text-sm mt-1">{currentIndex + 1} / {images.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;