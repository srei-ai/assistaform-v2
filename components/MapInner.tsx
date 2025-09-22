'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Link from 'next/link'
import type { Site } from '@/lib/content'

// Basic marker icon fix for Leaflet + Next
const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25,41],
  iconAnchor: [12,41]
});

export default function MapInner({ sites, height='400px' }: { sites: Site[], height?: string }) {
  const center = sites.length ? [sites[0].practical.geo.lat, sites[0].practical.geo.lng] as [number, number] : [53.8, -1.55] as [number, number];
  return (
    <MapContainer center={center} zoom={10} style={{height}} className="rounded-card overflow-hidden">
      <TileLayer
        url={process.env.NEXT_PUBLIC_MAP_TILES_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
        attribution={process.env.NEXT_PUBLIC_MAP_ATTRIBUTION || '© OpenStreetMap contributors'}
      />
      {sites.map(s => (
        <Marker key={s.slug} position={[s.practical.geo.lat, s.practical.geo.lng]} icon={icon}>
          <Popup>
            <div className="text-sm">
              <strong>{s.name}</strong>
              <div className="mt-1"><Link className="text-brand underline" href={`/sites/${s.slug}`}>View details</Link></div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
