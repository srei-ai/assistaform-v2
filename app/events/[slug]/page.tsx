import Link from 'next/link'
import { getEvent, getSite } from '@/lib/content'
import { notFound } from 'next/navigation'

export default function EventDetail({ params }: { params: { slug: string } }) {
  const event = getEvent(params.slug)
  if (!event) return notFound()
  const venue = getSite(event.venue_slug)

  return (
    <div className="container-narrow py-10">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-700 mt-2">{event.summary}</p>
      <p className="text-sm text-gray-600 mt-2">{new Date(event.start).toLocaleString()} – {new Date(event.end).toLocaleTimeString()}</p>
      <p className="text-sm text-gray-600">Venue: {venue?.name}</p>
      {event.booking_url && <p className="mt-3"><a className="underline text-brand" href={event.booking_url} target="_blank">Booking & details</a></p>}
      <div className="mt-6">
        <Link className="btn" href="/events">Back to events</Link>
      </div>
    </div>
  )
}
