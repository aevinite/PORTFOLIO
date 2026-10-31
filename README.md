# aevinite.com

Source of **[aevinite.com](https://www.aevinite.com)**, the website of **Aevinite**: a company that helps businesses grow, based in Ahmedabad, Gujarat, India, founded on 28 July 2024 by **Rishi Nakrani** (Founder) and **Jenish Patel** (Co-Founder). Aevinite started as *Infinite* and was renamed on 16 June 2026. It builds custom business software, SaaS products, websites and apps, 3D web experiences and AI automation.

- About & founders: https://www.aevinite.com/about
- Contact: https://www.aevinite.com/contact · rishi@aevinite.com
- LinkedIn: https://www.linkedin.com/company/aevinite/ · Instagram: https://www.instagram.com/aevinite/

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations), **Three.js / @react-three/fiber / drei** (hero 3D), **Lenis** (smooth scroll)
- Fonts: **Instrument Sans** + **Instrument Serif**, self-hosted at build time by `next/font`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
npm run start    # serve the production build
```

## Editing content

**Light and dark.** Light is the default for every visitor; the switch top-right saves the choice
(`localStorage` key `aev-theme`). Every colour is a token in `src/app/globals.css` (`--bg`, `--ink`,
`--muted`, `--accent`, `--gold`…), redefined under `[data-theme="dark"]`. Components use the token
classes (`bg-bg`, `text-ink`, `text-muted`, `border-line`, `text-accent`), never raw colours.
Dark-only flourishes (headline shimmer, cursor spotlight, grain) live in the same file.

**Projects** are data-driven: `src/data/projects.json` (title, category, tech, descriptions,
`demoUrl`, `images`, optional `video`). Images live in `public/projects/<id>/`.

**Our two products** (Aevidine = gold, Campus Conveyance = amber) are described once in
`src/data/products.ts`: name, colour, film, the people and their screens. The home page cards, each
product's story, the Products menu and the footer read it. Each product also has its own page
(`src/app/aevidine/page.tsx`, `src/app/campus/page.tsx`) with the long text search engines read.

**Films**: `src/data/films.ts` (sources, chapters with start times). The web copies in `public/films/`
are made from the 4K masters in `~/Documents/Projects/brag-output/` (1280x720, about 6 to 8 MB, plus
a 12-second silent loop each). Screen stills: `public/films/aevidine-screens/`, `public/films/campus-screens/`.

Home page sections, in order, in `src/components/sections/`: Hero (3D infinity:
`src/components/hero/InfinityScene.tsx`), Marquee, ProductsIntro, ProductStory (once per product), Process (scroll-drawn growth
curve), Services, Work, Stats, CallToAction. Shared pieces: `src/components/ui.tsx`, Navbar,
Footer, ThemeToggle, FilmPlayer, StartProjectModal.

## Deploy

Pushing to `main` runs `.github/workflows/pages.yml`: it builds the site as plain files
(`next.config.ts` → `output: "export"`, written to `out/`) and publishes them on **GitHub Pages** at
www.aevinite.com (`public/CNAME`). No environment variables are required. The site moved off Vercel
on 30 Oct 2026: it shared a free account with the restaurant app and was paused along with it.

Company facts live in one place, `src/lib/company.ts`; the About page, the footer and the JSON-LD read from it. `public/llms.txt` repeats them by hand, so change both together.
