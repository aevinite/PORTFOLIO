# aevinite.com

Source of **[aevinite.com](https://www.aevinite.com)**, the website of **Aevinite**: a software company based in Ahmedabad, Gujarat, India, founded on 28 July 2024 by **Rishi Nakrani** (Founder) and **Jenish Patel** (Co-Founder). Aevinite started as *Infinite* and was renamed on 16 June 2026. It builds custom business software, SaaS products, websites and apps, 3D web experiences and AI automation.

- About & founders: https://www.aevinite.com/about
- Contact: https://www.aevinite.com/contact · rishi@aevinite.com
- LinkedIn: https://www.linkedin.com/company/aevinite/ · Instagram: https://www.instagram.com/aevinite/

## Development

Next.js (App Router) + Tailwind, deployed on Vercel from `main`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Company facts live in one place, `src/lib/company.ts`; the About page, the footer and the JSON-LD read from it. `public/llms.txt` repeats them by hand, so change both together.
