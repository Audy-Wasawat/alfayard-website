# Al Fayard Website — 1441

> Official website for **Al Fayard**, a Hajj & Umrah travel company.  
> Built with **Next.js** (App Router) + **Supabase**.

---

## Getting Started (Local Development)

```bash
npm install
cp .env.local.example .env.local   # Fill in your Supabase URL and anon key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

| Path | Description |
|---|---|
| `app/` | All pages — Next.js App Router |
| `components/` | Reusable UI components (Header, Footer, Cards, etc.) |
| `lib/data.js` | All Supabase data-fetching functions |
| `lib/images.js` | Converts Google Drive file IDs into renderable image URLs |
| `lib/supabase.js` | Supabase client connector (server-side only) |

---

## Content Management

All content — services, promotions, portfolio trips, team members, FAQs, and company info — is fetched directly from **Supabase**. No code changes or redeployments needed.

To update content, go to **Supabase Studio → Table Editor** and edit the relevant table. The website refreshes automatically within **60 seconds** based on the `revalidate` setting.

**Placeholder text** (e.g., `[Month 2568]` or `[Position]`) means the field has not been filled in yet. Update these in the following tables:

- `promotions`
- `portfolio_trips`
- `team_members`
- `site_settings`

> **Images** are sourced from Google Drive via a separate sync script.  
> See the `drive-sync/` folder on the configured machine. No manual image uploads are needed on this site.

---

## Deploying to Vercel

1. Push this repository to your own GitHub repo.
2. Go to [https://vercel.com](https://vercel.com) → **New Project** → Import from GitHub.
3. Set the following **Environment Variables** in Vercel:

   | Variable | Description |
   |---|---|
   | `SUPABASE_URL` | Your Supabase project URL |
   | `SUPABASE_ANON_KEY` | Your Supabase anonymous (public) key |

   > Copy these values from your local `.env.local` file.  
   > **⚠️ Never commit `.env.local` to GitHub.**

4. Click **Deploy**. Vercel will provide a preview URL — connect your custom domain afterwards.

---

## Tech Stack

- [Next.js](https://nextjs.org/) — React framework with App Router
- [Supabase](https://supabase.com/) — PostgreSQL database & API
- [Vercel](https://vercel.com/) — Hosting & deployment
