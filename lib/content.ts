import fs from 'fs';
import path from 'path';

export type Site = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  highlights: string[];
  practical: {
    address: string;
    geo: { lat: number; lng: number };
    getting_there: string[];
    opening_hours: string;
    prices: string;
    accessibility: string[];
  };
  images: { src: string; alt: string; credit_text: string; credit_url: string }[];
  tags: string[];
  nearby: string[];
};

export type EventItem = {
  slug: string;
  title: string;
  venue_slug: string;
  start: string;
  end: string;
  summary: string;
  booking_url?: string;
  price?: string;
  tags: string[];
};

const contentDir = path.join(process.cwd(), 'content');

export function readJSONDir<T = any>(subdir: string): T[] {
  const dir = path.join(contentDir, subdir);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    return JSON.parse(raw) as T;
  });
}

export function getSites(): Site[] {
  return readJSONDir<Site>('sites');
}

export function getSite(slug: string): Site | undefined {
  return getSites().find(s => s.slug === slug);
}

export function getEvents(): EventItem[] {
  return readJSONDir<EventItem>('events').sort((a, b) => a.start.localeCompare(b.start));
}

export function getEvent(slug: string): EventItem | undefined {
  return getEvents().find(e => e.slug === slug);
}
