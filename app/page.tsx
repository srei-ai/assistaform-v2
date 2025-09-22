import Hero from '@/components/Hero'
import SiteCard from '@/components/SiteCard'
import Map from '@/components/Map'
import { getSites, getEvents } from '@/lib/content'
import Link from 'next/link'

export default function Home() {
  const sites = getSites().slice(0,6)
  const events = getEvents().slice(0,6)
  return (
    <div>
      <Hero />
      <section className="container-narrow py-12">
        <h2 className="text-2xl font-semibold">Featured Places</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {sites.map(s => <SiteCard key={s.slug} site={s} />)}
        </div>
        <div className="mt-6">
          <Link className="btn" href="/sites">See all sites</Link>
        </div>
      </section>
      <section className="container-narrow py-12">
        <h2 className="text-2xl font-semibold">Map Preview</h2>
        <div className="mt-4">
          <Map sites={getSites()} />
        </div>
      </section>
      <section className="container-narrow py-12">
        <h2 className="text-2xl font-semibold">What&apos;s On</h2>
        <ul className="mt-4 grid md:grid-cols-2 gap-4">
          {events.map(e => (
            <li key={e.slug} className="card p-4">
              <div className="text-sm text-gray-600">{new Date(e.start).toLocaleString()}</div>
              <h3 className="font-semibold"><Link href={`/events/${e.slug}`}>{e.title}</Link></h3>
              <p className="text-sm text-gray-700">{e.summary}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6"><Link className="btn" href="/events">Browse events</Link></div>
      </section>
    </div>
  )
}
