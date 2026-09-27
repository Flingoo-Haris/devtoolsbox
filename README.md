# DevToolbox

A free, static, client-side toolkit of 12 developer utilities: JSON formatter, SQL formatter,
application.properties ↔ YAML converter, Base64 encoder/decoder, Unix timestamp converter,
UUID generator, hash generator (MD5/SHA-1/256/384/512), JWT decoder, regex tester, cron parser,
API mocker/tester, and a text/JSON diff checker.

No build step, no backend, no database, no dependencies. Every tool runs entirely in the
visitor's browser — nothing they paste is ever uploaded.

## 1. Before you deploy

Open `gen/template.py` and change this line to your real domain:

```python
SITE_URL = "https://www.devtoolbox.example"
```

Then regenerate the site (optional — only needed if you edit anything in `gen/`):

```bash
cd gen
python3 build.py
python3 build_site_pages.py
```

This rewrites every HTML file, `sitemap.xml`, `robots.txt`, `manifest.json` and the canonical
URLs using the domain above. **The `gen/` folder is only a generator — it is not needed in
production.** You can delete it after generating, or just not deploy it (see step 3).

## 2. Deploy (pick one — all free, all zero-config)

**Netlify (drag and drop)**
1. Go to app.netlify.com/drop
2. Drag this whole folder in (minus `gen/`, `e2e_test.js` if present)
3. Done — you get a live HTTPS URL instantly, and can add a custom domain in settings.

**Vercel**
```bash
npm i -g vercel
vercel --prod
```

**GitHub Pages**
1. Push this folder to a GitHub repo
2. Repo Settings → Pages → Deploy from branch → `main` / root
3. Your site is live at `https://<username>.github.io/<repo>/`
   (if not using a custom domain, update `SITE_URL` in `gen/template.py` to that URL and regenerate)

**Cloudflare Pages**
1. Connect the repo (or drag-and-drop the folder) at pages.cloudflare.com
2. Build command: none. Output directory: `/`

Any of these works with the `gen/` folder left in place — it's just inert Python files that
won't affect the live site — but removing it keeps the deploy leaner.

## 3. File structure

```
index.html                  Homepage — links to every tool, categorized
about.html                  About / trust page (no-upload explanation)
404.html                    Custom not-found page
tools/*.html                12 tool pages, one per URL (good for SEO — each targets its own keyword)
css/style.css                Shared design system
js/common.js                 Shared behaviour (mobile nav, copy buttons, search filter)
sitemap.xml                  Auto-generated — submit this to Google Search Console
robots.txt                   Allows all crawlers, points to sitemap.xml
manifest.json                Basic PWA manifest (installable icon/name)
favicon.svg                  Site icon
gen/                         Python site generator (not needed at runtime — see step 1)
```

## 4. SEO — what's already built in

- **One URL per tool** (`/tools/json-formatter.html`, `/tools/jwt-decoder.html`, …) so each can
  rank independently for its own high-intent search query ("jwt decoder online", "json formatter online free").
- **Unique `<title>` and meta description per page**, written around the actual search phrase
  people use, not generic boilerplate.
- **Canonical tags** on every page (fix the domain in step 1 first).
- **Structured data (JSON-LD)** on every tool page: `SoftwareApplication`, `FAQPage` (so FAQs can
  show as rich results) and `BreadcrumbList`. The homepage carries `WebSite` + `ItemList`.
- **Real content, not just a widget**: each tool page has an H1, a lede paragraph, a "How to use"
  section, and 4 FAQs — this is what gets pages indexed and ranked, not the tool alone.
- **Internal linking**: every tool page links to 3 related tools, and the homepage links to all 12 —
  this spreads link equity and keeps crawl depth shallow.
- **`sitemap.xml` + `robots.txt`** ready to submit to Google Search Console / Bing Webmaster Tools.
- **Semantic HTML + accessible labels** (labeled inputs, skip link, visible focus states, alt-free
  since there are no content images) — accessibility is itself a (minor) ranking signal and improves UX.
- **Fast by construction**: no framework, no build step, a handful of KB of CSS/JS per page, fonts
  loaded with `font-display: swap` — Core Web Vitals (a ranking factor) should be strong by default.
- **Mobile responsive** — mobile-friendliness is a Google ranking requirement, not a bonus.

## 5. What YOU still need to do to actually rank

No on-page SEO alone gets you to page 1 — Google also weighs off-page signals and real usage:

1. **Submit the sitemap** in Google Search Console (search.google.com/search-console) and Bing
   Webmaster Tools right after deploying — this is what gets pages crawled quickly instead of
   waiting weeks for organic discovery.
2. **Get a few backlinks.** Post each tool where developers already are: relevant subreddits
   (r/webdev, r/programming), Hacker News "Show HN", dev.to, Indie Hackers, your GitHub profile
   README. A handful of genuine links matters more than any on-page tweak.
3. **Write 1–2 short blog posts** per tool if you want extra ranking surface (e.g. "How to decode
   a JWT without a library") — link them to the tool page. Not required to launch, but compounds
   over months.
4. **Keep the domain consistent.** Don't change the URL structure after launch — that resets
   accumulated ranking signals.
5. **Be patient.** Expect real organic traffic in 4–12 weeks even with everything above done
   correctly — search rankings for a brand-new domain always ramp up gradually.

## 6. AdSense

Once you have a little organic traffic and the 12 tool pages plus About page live at your real
domain, apply at google.com/adsense. Add your ad unit `<script>`/`<ins>` snippets into a copy of
`css/style.css`'s sibling markup (e.g. just before `</main>` in the tool page template in
`gen/build.py`, then regenerate) so placement stays consistent across all 12 pages.
