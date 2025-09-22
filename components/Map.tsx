'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import type { Site } from '@/lib/content'

const LeafletMap = dynamic(() => import('./MapInner'), { ssr: false })

export default function Map({ sites, height='400px' }: { sites: Site[], height?: string }) {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  if (!ready) return <div className="w-full rounded-card bg-gray-100" style={{height}} />
  return <LeafletMap sites={sites} height={height} />
}
