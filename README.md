# West Yorkshire Historic Sites

A lightweight, content-driven Next.js site showcasing historic places across West Yorkshire. Designed for Vercel deployment.

## Quick Start

```bash
npm install
npm run dev
# or
npm run build && npm start
```

## Env
Create `.env.local` (optional) based on `.env.example` for custom map tiles attribution/URL.

## Deploy to Vercel
Push to GitHub and import the repo in Vercel. Framework preset: **Next.js**. No build tweaks required.

## Add Content
Add JSON files in `content/sites` and `content/events`. Images live in `public/images` or use remote-allowed hosts (see `next.config.mjs`).

## Licenses
Only use images with open licenses. Include attribution (`credit_text`, `credit_url`) inside each content JSON.
