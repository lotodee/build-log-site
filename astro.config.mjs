import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Deploy target: Vercel free tier, static output. No adapter needed —
// Astro's default `output: 'static'` produces a plain static site that
// Vercel auto-detects and serves from its CDN at zero cost.
export default defineConfig({
  site: 'https://honest-agent-log.vercel.app',
  integrations: [
    starlight({
      title: 'honest-agent — build log',
      description:
        'A dated, honest build log for honest-agent: the goal, the story, what broke, and the real proof, day by day.',
      social: [],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Overview',
          link: '/',
        },
        {
          label: 'About this site',
          link: '/about/',
        },
        {
          label: 'Build days',
          items: [
            { label: 'Milestone 0 — Codebase primed', link: '/days/milestone-0/' },
            { label: 'Day 1 — Auth spine', link: '/days/day-01/' },
            { label: 'Day 2 — Tenant isolation', link: '/days/day-02/' },
            { label: 'Day 3 — OCR/vision PDF spike', link: '/days/day-03/' },
            { label: 'Day 4 — Ingestion end-to-end', link: '/days/day-04/' },
            { label: 'Day 5 — Agent + grounded answer', link: '/days/day-05/' },
            { label: 'Day 6 — Refusal + injection guardrail', link: '/days/day-06/' },
            { label: 'Day 7 — Observability + eval gate', link: '/days/day-07/' },
            { label: 'Day 8 — Red to green', link: '/days/day-08/' },
            { label: 'Day 9 — Dashboard + deploy', link: '/days/day-09/' },
            { label: 'Day 10 — Embeddable widget', link: '/days/day-10/' },
            { label: 'Day 11 — Injection demo + telemetry', link: '/days/day-11/' },
            { label: 'Day 12 — Hardening + README essay', link: '/days/day-12/' },
          ],
        },
      ],
    }),
  ],
});
