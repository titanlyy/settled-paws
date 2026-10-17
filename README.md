# Settled Paws

Problem-focused dog training site for home owners and apartment dwellers. Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, designed to meet Google AdSense / Search Essentials quality expectations for a new publisher.

## Quick start

```bash
cd settled-paws
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve production build
```

Set your public URL (used for canonicals, sitemap, Open Graph):

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Project structure

```
content/articles/     # Markdown cornerstone articles (frontmatter + body)
src/app/              # App Router pages (home, articles, categories, legal)
src/components/       # Header, Footer, AdSlot, ArticleCard, etc.
src/lib/site.ts       # Brand, nav, categories, disclaimer
src/lib/articles.ts   # Markdown loader + HTML render
```

## Where to paste AdSense code

1. **Auto ads / script** — in `src/app/layout.tsx`, inside `<head>`, replace the HTML comment with:

   ```html
   <script async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossOrigin="anonymous"></script>
   ```

2. **Manual units** — `src/components/AdSlot.tsx` placeholders:
   - `in-article-intro` — after first paragraph
   - `in-article-mid` — between H2 sections
   - `in-article-end` — before related posts
   - `sidebar` — desktop only
   - `footer` — site footer

   Replace the dashed placeholder `<div>` with an `<ins class="adsbygoogle">` unit and your real `data-ad-client` / `data-ad-slot`. Keep the visible **Advertisement** label.

3. **Do not** invent publisher IDs. Use the ID from your AdSense account after approval.

4. Prefer modest density—especially on mobile. No popups or interstitials.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://settledpaws.com`).
4. Deploy. Add the domain in Vercel → Domains, and enable HTTPS (default).
5. Verify `/sitemap.xml` and `/robots.txt` resolve.
6. Submit the sitemap in Google Search Console.

Optional CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

## AdSense application checklist (this site)

Before applying (or shortly after launching):

- [ ] Site live on a real domain with HTTPS
- [ ] Original cornerstone content published (10 guides included)
- [ ] About, Contact, Privacy Policy, Terms visible in footer
- [ ] Author / editorial transparency pages live
- [ ] Privacy Policy mentions ads/cookies (update when AdSense is live)
- [ ] Navigation clear on mobile; content readable; no cloaking
- [ ] Ads labeled; content-first layout; no ads-only above the fold
- [ ] Contact email updated from the placeholder
- [ ] `NEXT_PUBLIC_SITE_URL` matches the live domain
- [ ] Search Console verified; sitemap submitted
- [ ] Review [Google Search Essentials](https://developers.google.com/search/docs/essentials) and [Better Ads standards](https://www.betterads.org/)

**Important:** AdSense approval is never guaranteed. Quality, originality, and a finished site help; traffic thresholds and policies change. Do not claim veterinary authority.

## Content

See [CONTENT_NOTES.md](./CONTENT_NOTES.md) for slugs, word counts, and primary keywords.

## License / use

Site code scaffold is yours to deploy. Article content was written for this project—keep attribution if you republish excerpts.
