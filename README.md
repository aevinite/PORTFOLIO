# AEVINITE — Portfolio

Interactive digital studio portfolio. A dark, motion-rich Next.js site showcasing
selected work in a 3D coverflow, with a consultative "Start a Project" flow.

**Live:** deployed on Vercel.

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
