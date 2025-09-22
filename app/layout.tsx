import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'West Yorkshire Historic Sites',
  description: 'Discover abbeys, halls, castles and industrial landmarks across West Yorkshire.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white/70 backdrop-blur">
          <nav className="container-narrow flex items-center justify-between py-4">
            <Link href="/" className="font-semibold">West Yorkshire Historic Sites</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/sites">Sites</Link>
              <Link href="/events">Events</Link>
              <Link href="/itinerary">Itinerary</Link>
              <Link href="/plan">Plan</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </nav>
        </header>
        <main className="min-h-[70vh]">{children}</main>
        <footer className="border-t mt-12">
          <div className="container-narrow py-8 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} West Yorkshire Historic Sites. Image credits remain with original authors.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
