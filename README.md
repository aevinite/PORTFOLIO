# aevinite.com

Source of **[aevinite.com](https://www.aevinite.com)**, the website of **Aevinite**: a software company based in Ahmedabad, Gujarat, India, founded on 28 July 2024 by **Rishi Nakrani** (Founder) and **Jenish Patel** (Co-Founder). Aevinite started as *Infinite* and was renamed on 16 June 2026. It builds custom business software, SaaS products, websites and apps, 3D web experiences and AI automation.

- About & founders: https://www.aevinite.com/about
- Contact: https://www.aevinite.com/contact · rishi@aevinite.com
- LinkedIn: https://www.linkedin.com/company/aevinite/ · Instagram: https://www.instagram.com/aevinite/

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations), **Three.js / @react-three/fiber** (hero 3D), **Lenis** (smooth scroll), **GSAP**

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
npm run start    # serve the production build
```

## Editing content

**Projects** are data-driven — edit one file:

- `src/data/projects.json` — title, category, tech, descriptions, `demoUrl`, slide `interval`, and the `images` array per project. Set `"comingSoon": true` for the hype / placeholder card.
- Project images live in `public/projects/<id>/` and are referenced as `/projects/<id>/<file>.webp`.

Other key sections live in `src/components/sections/` (Hero, About, ServicesC,
ProjectShowcase, TechStack, Stats) with shared pieces in `src/components/`
(Navbar, Footer, StartProjectModal).

## Deploy

Pushing to `main` triggers a Vercel deployment. No environment variables are required.

Company facts live in one place, `src/lib/company.ts`; the About page, the footer and the JSON-LD read from it. `public/llms.txt` repeats them by hand, so change both together.
