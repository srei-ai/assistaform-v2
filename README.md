# AssistaForm — Zero-Setup Starter

A minimal, **production-deployable** MVP for the AssistaForm idea.
- Next.js (Pages Router) + Supabase (Postgres)
- Serverless API uses the **Supabase service role** (server-side only), so you can keep RLS **enabled** with **no public policies**.
- Public share links use `public_id` (separate from primary key).

## One-Click Deploy (recommended)
1) **Create a Supabase project** → copy your **Project URL** and **Service Role Key** (Settings → API).
2) In Supabase → SQL editor, run the contents of `supabase/schema.sql`.
3) **Create a new Vercel project** → import this repo → set env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4) Deploy. Visit `/dashboard` to create a form, then share `/f/{public_id}`.

## Local Dev (optional)
```bash
npm i
npm run dev
```
Create a `.env.local` from `.env.example`.

## Security Notes
- Service role key is used **only** in API routes (server-side). Never expose it to the browser.
- RLS stays enabled. No public policies required because service role bypasses RLS.
- Add auth later to associate forms with a user and restrict writes.

## API
- `POST /api/forms`  body: `{ title, fields: string[] }`  → returns `{ id, public_id, title, schema }`
- `GET /api/forms?id={public_id}` → returns a form for the fill page

## License
MIT
