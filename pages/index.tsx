import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

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

export async function getStaticProps({ locale }) {
  const imagesDir = path.join(process.cwd(), 'public/img');
  const files = fs.readdirSync(imagesDir);
  const images = files
    .filter((file) => /\.(jpe?g|png|gif)$/i.test(file))
    .map((file, index) => ({
      src: `/img/${file}`,
      title: customTitles[index] || `Картина ${index + 1}`,
      description: customDescriptions[index] || ''
    }));
  return {
    props: {
      images,
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

export default function Home({ images }) {
  const [selected, setSelected] = useState(null);
  const [theme, setTheme] = useState('dark');
 const translation = useTranslation('common');
const t = translation.t;

  const router = useRouter();

  const changeLanguage = (lng) => {
    router.push(router.pathname, router.asPath, { locale: lng });
  };

  return (
    <main className={\`\${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-black'} min-h-screen p-8\`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-center w-full">Галерея КАРТИНИ 🖼️</h1>
        <div className="flex flex-col items-end absolute right-8 top-8 gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="border px-3 py-1 rounded"
          >
            {theme === 'dark' ? '☀️ Світла тема' : '🌙 Темна тема'}
          </button>
          <select onChange={(e) => changeLanguage(e.target.value)} className="text-black rounded px-2 py-1 mt-2">
            <option value="uk">🇺🇦 Українська</option>
            <option value="en">🇬🇧 English</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg scale-90">
            <Image
              src={img.src}
              alt={img.title}
              width={500}
              height={500}
              layout="responsive"
              objectFit="cover"
              className="cursor-pointer hover:scale-105 transition"
              onClick={() => setSelected(img)}
            />
            <div className="p-2 text-center font-semibold">{img.title}</div>
            <div className="text-center pb-2">
              <a
                href={customLinks[index]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
              >
                {t('buy_nft')}
              </a>
            </div>
          </div>
        ))}
      </div>

      {selected && createPortal(
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative w-full max-w-[900px] max-h-[90vh] overflow-hidden bg-neutral-900 rounded-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-white text-2xl hover:text-red-500 z-10" onClick={() => setSelected(null)}>
              &times;
            </button>
            <div className="relative w-full aspect-[4/3] bg-black">
              <Image
                src={selected.src}
                alt={selected.title}
                fill
                className="object-contain rounded-t-xl"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className="bg-neutral-900 text-white text-center px-6 py-4">
              <div className="text-2xl font-bold">{selected.title}</div>
              <div className="text-base italic mt-2">{selected.description}</div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </main>
  );
}
