# Al Fayard 1441 — Company Website

Official website for **บริษัท อัล ฟายาร์ด 1441 จำกัด** (AL FAYARD 1441 CO., LTD.),
a family-run Hajj, Umrah, and Umrah-visa travel agency.

The site is an informational, trust-building brochure site — it shows services,
current promotions, and past-trip portfolios so customers can read up before
reaching out on LINE. There is **no membership, cart, or online payment**.

- **Live:** https://alfayard-website.vercel.app
- **Stack:** Next.js 16 (App Router, JavaScript) · React 19 · Supabase (Postgres) · plain CSS · deployed on Vercel

---

## Getting started (local development)

```bash
npm install
cp .env.local.example .env.local   # then fill in the Supabase values
npm run dev
```

Open http://localhost:3000

`.env.local` needs:

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon (public) key |

> ⚠️ Never commit `.env.local` — it is already in `.gitignore`.

---

## Project structure

| Path | What's inside |
|---|---|
| `app/page.js` | Home page |
| `app/about/page.js` | About |
| `app/services/page.js` | Services |
| `app/promotions/` | Promotions list + `[slug]` detail page |
| `app/portfolio/` | Portfolio list + `[slug]` trip detail page |
| `app/faq/page.js` | FAQ |
| `app/contact/page.js` | Contact (+ `actions.js` server action) |
| `app/layout.js` | Root layout — fonts, metadata, favicon |
| `app/globals.css` | The entire design system (colors, layout, responsive) |
| `components/` | Reusable pieces: `SiteHeader`, `Nav`, `SiteFooter`, `PromoCard`, `TripCard`, `ImageBox`, `ContactForm`, `FaqBrowser`, `PageHead`, `Band`, `icons` |
| `lib/data.js` | All Supabase data-fetching functions + formatting helpers |
| `lib/supabase.js` | Supabase server client (revalidates every 60s) |
| `lib/images.js` | Turns a Google Drive file ID into a thumbnail URL |
| `public/` | Static assets: logos, favicon, LINE QR, `about-team.jpg`, `hero.png` |

Each page (`page.js`) assembles reusable components from `components/` plus its own
content. Editing a shared piece (e.g. `SiteHeader`) updates it across every page.

---

## Editing the site — two places

**1. Content that changes → Supabase Studio (no code, no deploy).**
Services, promotions, portfolio trips, team members, FAQs, and all company info
(phone, email, LINE, licenses, founding year, history) live in the database and are
fetched at request time. Edit them in **Supabase Studio → Table Editor**; the site
refreshes on its own within ~60 seconds (`revalidate = 60`).

Key `site_settings` fields:

| Field | Note |
|---|---|
| `license_number` | Travel business license (`31/01526`) |
| `hajj_license_number` | Hajj service license (`2/2568`) |
| `founding_year` | Stored as a **Gregorian year** (e.g. `2019`); the site adds 543 to show the Buddhist year |
| `history_text` | About-page company story |
| `phone` · `email` · `line_id` · `address` | Contact details |

Placeholder text in square brackets (e.g. `[ปี]`, `[ตำแหน่ง]`) means that field is
still empty — fill it in the matching table.

**2. Fixed wording & layout → edit the code, then push.**
Page headings, section labels, button text, and styling are in the `.js`
files (per-page content in `app/<page>/page.js`, shared parts in `components/`,
styling in `app/globals.css`). In VS Code, `Ctrl+Shift+F` searches all files for the
exact text to find where it lives.

---

## Images

Photos are **not** stored in Supabase — the database only keeps a Google Drive file
ID (`*_drive_id`). To keep them loading reliably, the site does **not** hotlink Drive
directly (Drive rate-limits that, so images break at random); instead `lib/images.js`
points each image at an in-app proxy — `app/api/img/route.js` — which fetches the file
from Drive once and caches it on Vercel's CDN. A separate sync script (`drive-sync/`,
run manually) reads the Drive folders and writes the file IDs into the database.

Two things are required for a photo to appear on the site:

1. The row exists in Supabase with the correct `slug` matching its Drive folder.
2. The Drive folder's **General access is set to "Anyone with the link → Viewer."**
   Sharing only with the sync service account is *not* enough — the public browser
   must be able to load it. Quick test: open the thumbnail URL in an Incognito window.

A few one-off images (logos, favicon, LINE QR, the About group photo) live directly
in `public/` instead of Drive.

Primary images (promo posters, trip covers, hero photos) load eagerly; gallery grids
load lazily for performance.

---

## Syncing images from Google Drive

Uploading a photo to Drive does **not** put it on the site by itself — you must run
the sync script so the database picks up the file IDs. The sync is manual, not
real-time.

**Run it whenever you add or change any image** (poster, cover, gallery, team photo).
You do **not** need it when you only edit text or data in Supabase Studio.

```bash
cd /d D:\Hajj\website\drive-sync
node sync-drive-photos.mjs
```

At the start the script prints `role = service_role` — if it prints anything else,
stop, the key is wrong. At the end it prints a summary of what was matched / skipped.

**Rule of thumb: touched an image → run sync. Touched only text → no sync needed.**

### Drive folder layout

Folder and file names must match **exactly**. Trip folders sit **directly** under
`promotions/` or `portfolio/` — no extra wrapper folder in between.

```
promotions/<promotion-slug>/poster.<ext>          e.g. promotions/hajj-2568/poster.heic
promotions/<promotion-slug>/gallery/01-name.jpg
portfolio/<trip-slug>/cover.<ext>
portfolio/<trip-slug>/gallery/01-name.jpg
services/<service-slug>.<ext>
team/<member-slug>.<ext>
```

- The folder name must equal the row's `slug` in Supabase **exactly** (case-sensitive
  for promotions and portfolio). Create the row in Supabase Studio first, then name the
  Drive folder to match.
- The main image must be named `poster` (promotions) or `cover` (portfolio) — any
  extension.
- Gallery files: prefix with `01-`, `02-` to control order; the text after the dash
  becomes the image's alt text.
- Format can be JPG, PNG, or **HEIC** — iPhone photos work as-is; Google converts them
  to a web image automatically. No manual conversion needed.

### The folder must be shared publicly

Set the top image folder's **General access → "Anyone with the link → Viewer."**
Sharing only with the sync service account lets the script *read* the files, but the
public website also needs to *display* them. Quick test: open the image in an Incognito
window — if it shows, it's public.

### If an image still doesn't appear, check in this order

1. Did you run the sync after uploading?
2. Does the Drive folder name match the row's `slug` exactly (case included)?
3. Is the folder shared "Anyone with the link → Viewer"?
4. Give it up to ~60 seconds — the site revalidates its data on that interval.

---

## Deploying

The repo is connected to Vercel with **auto-deploy**: every push to `main` triggers a
new deployment.

```bash
git add .
git commit -m "your message"
git push
```

Environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) are already configured in
the Vercel project settings. A custom domain can be attached in Vercel when ready.
