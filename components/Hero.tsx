import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[56vh] md:h-[68vh]">
        <Image src="/placeholder.svg" alt="West Yorkshire heritage montage" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="container-wide absolute bottom-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-display font-semibold leading-tight drop-shadow">Heritage with heart</h1>
            <p className="lead mt-3 text-neutral-200">Grand houses, abbey ruins and industrial firsts — discover West Yorkshire&apos;s stories.</p>
            <div className="mt-6 flex gap-3">
              <Link href="/sites" className="btn-accent">Browse Sites</Link>
              <Link href="/events" className="btn-secondary text-white border-white/70 hover:bg-white/10">What&apos;s On</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
