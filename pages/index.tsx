import { useState } from "react";
import Image from "next/image";

const images = [
  { src: "/img/abstract.jpg", title: "Абстрактне мистецтво" },
  { src: "/img/watercolor.jpg", title: "Акварель" },
  { src: "/img/minimal.jpg", title: "Мінімалізм" },
  { src: "/img/popart.jpg", title: "Поп-арт" },
  { src: "/img/retro.jpg", title: "Ретро стиль" },
  { src: "/img/futurism.jpg", title: "Футуризм" },
  { src: "/img/autumn.jpg", title: "Осінь" },
  { src: "/img/graffiti.jpg", title: "Графіті" },
  { src: "/img/pixel.jpg", title: "Піксельна" },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const current = images[index];

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Галерея КАРТИНИ</h1>
      <p style={{ maxWidth: '600px', textAlign: 'center', color: '#ccc', marginBottom: '2rem' }}>
        Ця віртуальна колекція — подорож крізь стиль, колір і настрій. Автор надихнувся роботами <strong>Головного героя</strong>, щоб створити унікальний набір візуальних емоцій. Кожна картина — окремий світ.
      </p>

      <div style={{ position: 'relative', width: '100%', maxWidth: '800px', aspectRatio: '4 / 3', border: '4px solid white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 0 30px rgba(255,255,255,0.1)' }}>
        <Image
          src={current.src}
          alt={current.title}
          fill
          style={{ objectFit: 'contain' }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
          <button onClick={prev} style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>⬅ Назад</button>
          <button onClick={next} style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Вперед ➡</button>
        </div>
      </div>

      <div style={{ marginTop: '1rem', fontSize: '1.2rem', textAlign: 'center' }}>{current.title}</div>

      <footer style={{ marginTop: '2rem', color: '#aaa', fontSize: '0.9rem', textAlign: 'center' }}>
        Контакти: <a href="https://t.me/jeffersonx" target="_blank" style={{ textDecoration: 'underline', color: '#fff' }}>Телеграм @jeffersonx</a>
      </footer>
    </div>
  );
}