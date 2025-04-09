import { useState } from 'react';
import ImageWithZoom from "@/components/ImageWithZoom";
import ImageModal from "@/components/ImageModal"; // 🆕 додаємо

const customLinks = Array(9).fill("https://t.me/jeffersonx");

const customTitles = [
  "Абстрактне мистецтво",
  "Осінь",
  "Футуризм",
  "Графіті",
  "Мінімалізм",
  "Піксельна",
  "Поп-арт",
  "Ретро стиль",
  "Акварель"
];

const customDescriptions = [
  "Ця картина відображає хаос і гармонію одночасно, створюючи потужний емоційний ефект.",
  "Теплі тони, листя, ностальгія. Осінній настрій в кожному пікселі.",
  "Майбутнє вже тут — механіка, технології, космос.",
  "Вулична енергія, графіті-культура і вільне самовираження.",
  "Мінімалізм у кожному штриху — менше значить більше.",
  "Піксельна краса цифрової епохи — ретро та майбутнє в одному кадрі.",
  "Яскраві кольори та ритм поп-культури, що кричить про свободу.",
  "Вінтажна естетика минулого, яка оживає в новому цифровому просторі.",
  "Легкість акварелі передає відчуття спокою, мрійливості та прозорості."
];

interface Image {
  src: string;
  title: string;
  description: string;
}

export async function getStaticProps() {
  const images: Image[] = [
    { src: '/img/abstract.png', title: customTitles[0], description: customDescriptions[0] },
    { src: '/img/autumn.png', title: customTitles[1], description: customDescriptions[1] },
    { src: '/img/futurism.png', title: customTitles[2], description: customDescriptions[2] },
    { src: '/img/graffiti.png', title: customTitles[3], description: customDescriptions[3] },
    { src: '/img/minimal.png', title: customTitles[4], description: customDescriptions[4] },
    { src: '/img/pixel.png', title: customTitles[5], description: customDescriptions[5] },
    { src: '/img/popart.png', title: customTitles[6], description: customDescriptions[6] },
    { src: '/img/retro.png', title: customTitles[7], description: customDescriptions[7] },
    { src: '/img/watercolor.png', title: customTitles[8], description: customDescriptions[8] },
  ];

  return { props: { images } };
}

export default function Home({ images }: { images: Image[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <main className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-black'} min-h-screen p-6`}>
      <div className="relative mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">Галерея КАРТИНИ 🖼️</h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="fixed top-20 right-5 z-50 border px-3 py-1 rounded bg-neutral-800 text-white shadow-md hover:bg-neutral-700"
        >
          {theme === 'dark' ? '☀️ Світла тема' : '🌙 Темна тема'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg">
            <ImageWithZoom image={img} onClick={() => setSelectedIndex(index)} />
            <div className="p-2 text-center font-semibold">{img.title}</div>
            <div className="text-center pb-2">
              <a
                href={customLinks[index]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
              >
                Купити як NFT
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 🆕 Підключаємо модалку */}
      {selectedIndex !== null && (
        <ImageModal
          images={images}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </main>
  );
}
