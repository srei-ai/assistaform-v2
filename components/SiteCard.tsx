'use client'
import Link from 'next/link'
import Image from 'next/image'
import type { Site } from '@/lib/content'

export default function SiteCard({ site }: { site: Site }) {
  const image = site.images[0]?.src || '/placeholder.svg'
  return (
    <Link href={`/sites/${site.slug}`} className="card hover:shadow-lg transition block">
      <div className="relative aspect-[4/3] w-full">
        <Image src={image} alt={site.images[0]?.alt || site.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{site.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{site.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {site.tags.slice(0,3).map(t => <span key={t} className="badge">{t}</span>)}
        </div>
      </div>
    </Link>
  )
}
