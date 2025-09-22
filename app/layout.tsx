import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'West Yorkshire Historic Sites',
  description: 'Discover abbeys, halls, castles and industrial landmarks across West Yorkshire.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <nav className="container-wide flex items-center justify-between py-4">
            <Link href="/" className="text-lg font-display tracking-tight">
              <span className="px-3 py-1 rounded-full bg-accent text-white mr-2">WY</span>
              West Yorkshire Historic Sites
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/sites" className="hover:text-brand">Sites</Link>
              <Link href="/events" className="hover:text-brand">Events</Link>
              <Link href="/itinerary" className="hover:text-brand">Itinerary</Link>
              <Link href="/plan" className="hover:text-brand">Plan</Link>
              <Link href="/about" className="hover:text-brand">About</Link>
              <Link href="/contact" className="hover:text-brand">Contact</Link>
            </div>
          </nav>
        </header>
        <main className="min-h-[70vh]">{children}</main>
        <footer className="border-t mt-16 bg-white">
          <div className="container-wide py-8 text-sm text-neutral-600 grid md:grid-cols-2 gap-4">
            <p>© {new Date().getFullYear()} West Yorkshire Historic Sites.</p>
            <p className="md:text-right">Crafted with Next.js & Leaflet · Image credits remain with original authors.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
