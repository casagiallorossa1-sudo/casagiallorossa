# Casa Giallorossa (MVP Vercel + Supabase)

Questo progetto pubblica:
- Home: /
- Città: /cities
- Pagina città: /c/[slug]
- Pagina Porta (QR/NFC): /d/[doorId]
- Check-in (ultime 24h) con rate-limit

## 1) Prima cosa: crea Supabase
1. Crea un progetto su Supabase.
2. Vai su **SQL Editor**:
   - Incolla e RUN: `supabase/schema.sql`
   - Incolla e RUN: `supabase/seed.sql`

## 2) Prendi le chiavi Supabase
Supabase → Project Settings → API:
- `Project URL` → NEXT_PUBLIC_SUPABASE_URL
- `anon public` key → NEXT_PUBLIC_SUPABASE_ANON_KEY
- `service_role` key → SUPABASE_SERVICE_ROLE_KEY

## 3) Avvio in locale
1. Copia `.env.example` in `.env.local`
2. Incolla le chiavi
3. Lancia:
   - `npm install`
   - `npm run dev`

Apri: http://localhost:3000

## 4) Deploy su Vercel
Importa la repo su Vercel e aggiungi le env vars (stessi nomi).
