'use client'
import { useEffect, useMemo, useState } from 'react'
import type { Site } from '@/lib/content'
import Map from './Map'

type Props = { sites: Site[] }

export default function Itinerary({ sites }: Props) {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('itinerary')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('itinerary', JSON.stringify(items))
  }, [items])

  const selected = useMemo(() => items.map(slug => sites.find(s => s.slug === slug)).filter(Boolean) as Site[], [items, sites])

  function add(slug: string) {
    setItems(prev => prev.includes(slug) ? prev : [...prev, slug])
  }
  function remove(slug: string) {
    setItems(prev => prev.filter(s => s !== slug))
  }
  function clear() { setItems([]) }

  return (
    <div>
      <div className="flex gap-2">
        {sites.slice(0,12).map(s => (
          <button key={s.slug} onClick={() => add(s.slug)} className="badge hover:bg-gray-200">{s.name}</button>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Your plan</h3>
        {selected.length === 0 && <p className="text-sm text-gray-600">No stops yet. Add places above.</p>}
        <ul className="mt-2 space-y-2">
          {selected.map(s => (
            <li key={s.slug} className="card p-3 flex items-center justify-between">
              <span>{s.name}</span>
              <button onClick={() => remove(s.slug)} className="text-sm underline text-red-600">Remove</button>
            </li>
          ))}
        </ul>
        {selected.length > 0 && <button onClick={clear} className="mt-3 btn">Clear</button>}
      </div>
      {selected.length > 0 && (
        <div className="mt-6">
          <Map sites={selected} height="420px" />
        </div>
      )}
    </div>
  )
}
