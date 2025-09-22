import Image from 'next/image'
import Link from 'next/link'
import Map from '@/components/Map'
import { getSite, getSites } from '@/lib/content'
import { notFound } from 'next/navigation'

export default function SiteDetail({ params }: { params: { slug: string } }) {
  const site = getSite(params.slug)
  if (!site) return notFound()
  const nearby = site.nearby.map(getSite).filter(Boolean)

  return (
    <div className="container-narrow py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-soft">
          <Image src={site.images[0]?.src || '/placeholder.svg'} alt={site.images[0]?.alt || site.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{site.name}</h1>
          <p className="mt-2 text-gray-700">{site.summary}</p>
          <div className="mt-4">
            <h3 className="font-semibold">History</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{site.description}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Highlights</h3>
            <ul className="list-disc list-inside text-gray-700">
              {site.highlights.map(h => <li key={h}>{h}</li>)}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Plan your visit</h3>
            <div className="text-gray-700">
              <p><strong>Address:</strong> {site.practical.address}</p>
              <p><strong>Opening hours:</strong> {site.practical.opening_hours}</p>
              <p><strong>Prices:</strong> {site.practical.prices}</p>
              <p><strong>Access:</strong> {site.practical.accessibility.join(', ')}</p>
            </div>
          </div>
          {site.images[0]?.credit_text && (
            <p className="mt-2 text-xs text-gray-500">
              Image: <a className="underline" href={site.images[0].credit_url} target="_blank" rel="noreferrer">{site.images[0].credit_text}</a>
            </p>
          )}
          <div className="mt-6">
            <Link href="/itinerary" className="btn">Add to itinerary</Link>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold">Location</h3>
        <Map sites={[site]} height="420px" />
      </div>

      {nearby.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold">Nearby</h3>
          <ul className="list-disc list-inside text-gray-700">
            {nearby.map(s => <li key={s!.slug}><Link className="underline" href={`/sites/${s!.slug}`}>{s!.name}</Link></li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
