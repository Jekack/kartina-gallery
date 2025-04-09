import React, { useState } from 'react';
import ImageModal from './ImageModal';

const images = [
  {
    src: '/images/futurism.jpg',
    title: 'Футуризм',
    description: 'Майбутнє вже тут — механіка, технології, космос.',
  },
  {
    src: '/images/graffiti.jpg',
    title: 'Графіті',
    description: 'Вуличне мистецтво, яке говорить мовою бунту.',
  },
  // додай ще зображення
];

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img.src}
          alt={img.title}
          onClick={() => openModal(idx)}
          className="cursor-pointer hover:scale-105 transition rounded-lg shadow-lg"
        />
      ))}

      {isOpen && (
        <ImageModal
          images={images}
          initialIndex={selectedIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
