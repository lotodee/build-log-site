# honest-agent — build log site

A static, developer-documentation-style build log for the `honest-agent` 12-day build. Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build), deployed to Vercel's free Hobby tier.

This site is **not the product**. There is no embedded demo, no "try it" link. It is a process log: the goal, the story (plan, built, tested, what broke, the fix, green), a small architecture snapshot, and the real proof, day by day. See `src/content/docs/about.md` for the full honesty rule.

## What's in here

- `astro.config.mjs` — Starlight config, sidebar, site metadata.
- `src/content.config.ts` — the content-collection schema (extends Starlight's docs schema with `day_number`, `status`, `goal`, etc.). This frontmatter is the single source of truth the overview table reads from.
- `src/content/docs/index.mdx` — the home/overview page (product one-liner, the private-demo line, the generated 12-day table).
- `src/content/docs/about.md` — the site's own honesty rule.
- `src/content/docs/days/*.md` / `*.mdx` — one page per day. `milestone-0`, `day-01`, `day-02` are filled in as Done. `day-03` through `day-12` are seeded stubs marked Upcoming.
- `src/components/StoryFlow.astro` — the node-on-a-line story diagram (Plan → Built → Tested → Broke → Fixed → Green), with exactly one red node ("broke") and one green node ("green").
- `src/components/ArchSnapshot.astro` — the small per-day architecture snapshot (only what that day added, muted context boxes for the rest of the system).
- `src/components/StatusBadge.astro` — the Done / In progress / Upcoming badge used on the overview table and each day's header.
- `src/components/ScreenshotSlot.astro` — a placeholder slot for a screenshot to be dropped in later.
- `src/styles/custom.css` — the whole visual language in one file: dark theme, one accent color (`#7C5CFF`), and the two status colors reserved exclusively for pass/fail (`#EF4444` fail, `#22C55E` pass).
- `reference/` — copies of `status_site_skill_plan.md` and the draft `SKILL.md` that this site was built from, kept here so the plan travels with the code.

## Updating a day

Follow `reference/SKILL.md`: a day's page only gets rewritten from Upcoming to Done after that day's tests and reviews are actually green and the real material exists in the project's internal build log. Never invent a claim, a number, or a "what broke" moment that isn't in the source material.

## Local development

Requires Node.js 18.20.8+ / 20.3.0+ / 22.0.0+ (Astro 7's minimum).

```bash
npm install
npm run dev       # starts a local dev server, usually http://localhost:4321
npm run build     # builds the static site to dist/
npm run preview   # serves the built dist/ locally to sanity-check the production build
```

## Deploying to Vercel (free tier, no card required)

1. Push this folder to a **public** GitHub repo (or a private one — Vercel's free tier works with either, but keep the product repo separate from this one regardless).
2. Go to [vercel.com/new](https://vercel.com/new) and import that repo.
3. Vercel auto-detects Astro. Leave the defaults: build command `npm run build` (or `astro build`), output directory `dist`, install command `npm install`. No environment variables are needed for this static site.
4. Deploy. Vercel gives you a free `*.vercel.app` subdomain immediately — no custom domain, no card needed.
5. Every subsequent push to `main` auto-deploys. Every pull request gets its own free preview URL — use that preview to review a day's update (per `reference/SKILL.md`) before merging.

**Versions are pinned on purpose.** `package.json` pins exact versions of `astro` and `@astrojs/starlight` (no `^`, no `latest`). Do not bump them mid-build — Starlight has a real history of breaking changes roughly every couple of months, and this site only needs to survive the ~2-3 week life of the 12-day build. Revisit the pin only after Day 12.

## Adding a screenshot

Drop the image in `src/assets/days/day-XX/` and reference it by relative path from that day's markdown, replacing the `<ScreenshotSlot />` placeholder. Only add a screenshot when there's a genuine visual moment (a real UI change, or a CI/CD result worth showing) — never a decorative or stock image. See `reference/status_site_skill_plan.md` section 6 for the full screenshot workflow.
