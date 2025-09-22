'use client'
import Fuse from 'fuse.js'
import { useMemo, useState } from 'react'
import type { Site } from '@/lib/content'
import SiteCard from './SiteCard'

export default function SearchBar({ sites }: { sites: Site[] }) {
  const [q, setQ] = useState('')
  const fuse = useMemo(() => new Fuse(sites, { keys: ['name', 'summary', 'tags'], threshold: 0.4 }), [sites])
  const results = q ? fuse.search(q).map(r => r.item) : sites
  return (
    <div>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search by name, era, tag…"
        className="w-full border rounded-full px-4 py-2"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {results.map(s => <SiteCard key={s.slug} site={s} />)}
      </div>
    </div>
  )
}
