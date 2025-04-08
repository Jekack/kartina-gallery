import Image from 'next/image'
import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const imagesDir = path.join(process.cwd(), 'public/img')
  const files = fs.readdirSync(imagesDir)
  const images = files.filter(file => /\.(jpe?g|png|gif)$/i.test(file))
  return { props: { images } }
}

export default function Home({ images }: { images: string[] }) {
  return (
    <main className="p-8 min-h-screen bg-neutral-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Галерея КАРТИНИ 🖼️</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src={`/img/${img}`}
              alt={`Картина ${index + 1}`}
              width={500}
              height={500}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </main>
  )
}