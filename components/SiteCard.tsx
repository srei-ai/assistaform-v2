'use client'
import Link from 'next/link'
import Image from 'next/image'
import type { Site } from '@/lib/content'

export default function SiteCard({ site }: { site: Site }) {
  const image = site.images[0]?.src || '/placeholder.svg'
  return (
    <Link href={`/sites/${site.slug}`} className="card hover:shadow-lift hover:-translate-y-0.5 transition block">
      <div className="relative aspect-[4/3] w-full">
        <Image src={image} alt={site.images[0]?.alt || site.name} fill className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl">{site.name}</h3>
        <p className="text-sm text-neutral-700 line-clamp-2 mt-1">{site.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {site.tags.slice(0,3).map(t => <span key={t} className="badge">{t}</span>)}
        </div>
      </div>
    </Link>
  )
}
