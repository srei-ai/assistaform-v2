import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative">
      <div className="container-narrow py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">History, right on your doorstep</h1>
          <p className="mt-4 text-lg text-gray-700">
            From soaring abbey ruins to model Victorian villages, explore the stories that shaped West Yorkshire.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/sites" className="btn">Browse Sites</Link>
            <Link href="/events" className="btn" style={{backgroundColor:"var(--accent)"}}>What&apos;s On</Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full rounded-card overflow-hidden shadow-soft">
          <Image src="/placeholder.svg" alt="West Yorkshire heritage montage" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
