# Build-in-Public Status Site — Plan

**Status:** DRAFT, awaiting owner review. This is a plan only. Nothing in this document has been built. Once approved, the site gets its own day (or half-day) in the schedule and its own build prompt, same discipline as every other piece of `honest-agent`.
**Author:** produced 2026-07-03 per the owner's request, alongside `Skills/build-log-site/SKILL.md` (also DRAFT).
**Relationship to other docs:** `BUILD_SPEC_LOCKED.md` and `ARCHITECTURE.md` govern the product. This document governs a separate, small, low-risk side project: the public record OF building that product. It borrows the product's honesty rules but is not part of the product's stack, CI, or trust boundaries.

---

## 1. Purpose and audience

**What this site is.** A living, dated build log for the `honest-agent` 12-day build. Each day that lands gets an entry: the goal, the real story (plan, built, what broke, the fix, green), a small architecture snapshot of what that day added to the system, the real proof (test output, CI status), and a screenshot where there is something visual to show. An overview page shows all 12 days at a glance with status.

**Who it is for.**
- **Recruiters and hiring managers** doing due diligence on a candidate. They do not want to read 12 LinkedIn posts; they want one page that proves the work happened, in order, with the failures left in. This is a resume artifact that does the talking so Dotun does not have to re-explain the project in every interview.
- **Peers following the build** (the LinkedIn build-in-public audience) who want a durable home for the story that outlives the scroll of a feed. LinkedIn posts are ephemeral and short; this site is the archive they link back to.
- **Dotun himself**, as a forcing function. If the site update is part of "done" for a day, the habit of writing down what broke and how it got fixed happens by construction, not by memory three weeks later.

**What this site is explicitly NOT.**
- It is **not the product**. There is no chat widget embedded here, no live demo link, no "try it" button. The demo stays private and shareable only on direct request, per the locked spec's owner override #1 (`BUILD_SPEC_LOCKED.md` line 9: "Demo is private... Do NOT promote a public front door").
- It is **not a marketing site** for the product. No pricing, no feature list pitched at a buyer, no signup form. If a paragraph reads like it's trying to sell the product to a visitor rather than show the reader how it was built, it does not belong here.
- It is **not a second source of truth**. The day plan's content is drawn from `progress_log.md`, `build_log.md`, and `ARCHITECTURE.md`. If those files and the site ever disagree, the internal planning files win and the site gets corrected, not the other way round.

The line to hold: this is a **process log and craft artifact**, not a front door. Every page should pass the test "would I be comfortable if a recruiter read only this and never saw the private demo."

---

## 2. Tech choice

### Recommendation: Astro Starlight, deployed on Vercel's free Hobby tier.

**Why.**
- **Content model fits the update loop exactly.** Starlight pages are plain Markdown/MDX files under `src/content/docs/`. A new day's entry is: add `day-03.md`, write it, commit. The sidebar nav **auto-generates from the folder structure**, so there is no separate nav-config file to keep in sync every single day — one less thing to forget at 11pm after a long build day.
- **Zero-config Vercel deploy.** Vercel auto-detects Astro's static output; the free Hobby tier covers a static docs site with room to spare. No card needed beyond what Vercel's free tier already requires (none, for a personal/hobby project).
- **Built for exactly this document type.** Starlight is purpose-built developer documentation theming: sidebar, search, dark mode, code blocks, callouts (asides), all out of the box, all looking like "docs," which is precisely the clean, developer-documentation look the owner asked for. Fighting a general-purpose framework to reproduce this would be wasted effort.
- **Low ongoing maintenance for a 12-to-14-day lifespan.** This site will be actively edited for under three weeks and then mostly frozen (occasional touch-ups). Starlight's known churn (roughly one breaking release every couple of months, e.g. the March 2026 Astro-v6 bump and the May 2026 sidebar-config change) is a real cost for a multi-year docs site, but is a non-issue here: pin the version once at setup and do not upgrade mid-build. The plan explicitly calls for **pinning the Starlight/Astro version** at project creation and not touching it until after Day 12.
- **Fast, small, and it stays fast.** Astro ships near-zero client JS by default (an Astro/Starlight build benchmarks around 18s for 1000 pages vs. a comparable Nextra site around 52s; our site is ~15-18 pages, so this margin barely matters here, but it correlates with a leaner mental model and fewer moving parts to break).

**Runner-up: Nextra.** Also trivial to deploy on Vercel (it's plain Next.js under the hood), and if the owner ever wants the site to grow into something with custom React interactivity beyond simple diagrams, Nextra's "it's just Next.js" escape hatch is genuinely valuable. It loses to Starlight for this specific job for two concrete reasons: (1) Nextra needs a manual `_meta.js` file per folder to control nav order, which is one more file to edit correctly every day, where Starlight infers a sensible order from filenames/frontmatter automatically; (2) Nextra chases every Next.js major version (it needed a patch specifically for Next.js 16 in December 2025), which is more version-tracking overhead than this project should carry during an active 12-day sprint. If the owner later wants the site to become a longer-lived, more interactive personal engineering blog beyond this build, Nextra (or a custom Next.js app) is the natural next step, and the content (plain Markdown/MDX files) migrates cleanly because both are markdown-first.

**Rejected: Docusaurus.** More maintenance weight than this project should carry (React version alignment history, a documented MDX-migration pain point between major versions) for a benefit — versioned-docs, plugin ecosystem — this project does not need. 2026 community consensus already treats it as heavier than necessary for small, solo, content-first sites.

**Rejected: lean custom Next.js (hand-rolled, no framework).** Genuinely viable and gives full control, but it means hand-building the sidebar-from-folder-tree logic, dark mode toggle, and search that Starlight gives for free. For a 12-page site built by someone who is also building the actual product in parallel, that is effort better spent on the product. Worth revisiting only if the site later needs custom interactive widgets Starlight cannot express cleanly (unlikely; see visual design section — the diagrams are static SVG/HTML, not React components).

---

## 3. Information architecture

### Pages

1. **Home / overview (`/`).** The single page a recruiter should be able to read in two minutes and understand the whole project's state. Contains:
   - One-paragraph plain-English description of `honest-agent` (an AI support assistant, embeddable in one script tag, that refuses to answer when it cannot ground an answer, with the reliability layer as the actual product) — the same description used in the LinkedIn intro post, kept in sync with `BUILD_SPEC_LOCKED.md`'s one-line product description.
   - One line, unavoidable and near the top: **"This site documents how the project was built. The product demo is private; ask if you'd like to see it."** This is the line that keeps the private-demo boundary explicit rather than implied.
   - A table of all 12 days (plus Milestone 0), each row: day number, one-line goal, status badge (Done / In Progress / Upcoming), link to that day's page. This is the "seed the whole plan now" artifact the owner asked for: **all 12 days are listed from day one**, most of them marked Upcoming, so the reader sees the intended arc immediately, not just what has happened so far.
   - Links to the GitHub repo (if/when the owner decides to make it public or link it; currently unresolved, see Risks) and to the LinkedIn post series.

2. **One page per day (`/days/day-01`, `/days/day-02`, ... `/days/day-12`, plus `/days/milestone-0`).** Each page has the same fixed template (below), so the reader learns the shape once and every subsequent day is fast to scan. Days not yet built still exist as pages, in "Upcoming" state, showing only the planned goal and non-negotiables from `ARCHITECTURE.md` section 7 / `BUILD_SPEC_LOCKED.md`'s build sequence — no invented story content for days that have not happened.

3. **About / how this site works (`/about`).** One short page explaining the site's own honesty rule: entries are written after the day's tests and reviews pass, sourced from the real build log, updated via a PR, deployed on merge. This is a small piece of proof-of-process in itself (a meta-level demonstration of the same "check before you trust" thesis the product embodies) and pre-empts the obvious question "is this curated after the fact to look better than it was."

### Per-day page template (fixed structure, applied to every day)

1. **Header:** Day number, one-line goal, status badge, date landed (or "planned" if upcoming).
2. **The story flow** (only for Done/In-Progress days): a compact five-to-six-step visual (Plan → Built → Tested → What Broke → Fix → Green), styled per section 4 below. Text version underneath for search/copy/screen readers, not screenshot-only.
3. **What actually shipped:** a short prose recap in the owner's voice, drawn near-verbatim from `Posts/build_log.md`'s entry for that milestone. No new claims invented for the site; if `build_log.md` does not say it happened, the site does not say it happened.
4. **Architecture snapshot:** a small diagram or short structured list showing what this day added to the system (which door, which store, which seam), styled per section 4. Kept intentionally small — this is not the full `ARCHITECTURE.md` system diagram, it's "here is the one new piece."
5. **Proof:** real command output (the green quick-gate, the test count, the CI run link once the repo has real CI badges). Copy-pasted output in a code block, not paraphrased, not rounded up.
6. **Screenshots**, if applicable (see section 6). Only present when there is something genuinely visual for that day (UI, or a CI/CD run).
7. **Non-negotiables called out**, where the day carries one (Day 2 isolation, Day 3 poison-PDF survival, Day 8 red-to-green, Day 9 deployed) — a small badge or callout box, because these are the spine and deserve to read as such to a technical reader.

### How the full day-by-day plan is seeded now, and updated per day

- At site creation, all 12 day pages (plus Milestone 0) are created from the build sequence in `BUILD_SPEC_LOCKED.md` and the Day 2/3/4/7 refinements in `ARCHITECTURE.md` section 7. Each starts with only the header, goal, and non-negotiables filled in, status "Upcoming," and every other section absent (not stubbed with placeholder text — an empty section is more honest than a "coming soon" filler).
- **Days 1 and 2 are seeded now as Done**, using the real material already in `Posts/build_log.md` (Milestone 1 for Day 1, and Day 2's real content from `progress_log.md`: 10 isolation tests, 2 real bugs caught by review, 0 cross-tenant leaks).
- Each subsequent day, once its tests and reviews are green, gets its Upcoming page rewritten in place to Done, with the four missing sections filled in from that day's real build material. The day's status badge and the overview table both flip in the same commit.
- The frontmatter of each day file carries a `status` field (`upcoming | in_progress | done`) and a `day_number` field; the overview table is generated by reading that frontmatter across all files (a small Astro content-collection query), not hand-maintained twice. This is the single-source-of-truth rule applied to the site itself: the day page's frontmatter is truth, the overview table is a derived view.

---

## 4. Visual and interaction design

### Visual language

- **Dark theme**, matching the owner's existing portfolio and post-image style already established in `Posts/images/day2_diagram.html` and the LinkedIn image specs (`#0B0B0F` background family, `#ECECEF` primary text, `#9AA0AA` muted text). Consistency across LinkedIn images and the site reinforces one visual identity for the whole series.
- **One accent color only**, used sparingly for links, the current nav item, and "in progress" states. Reuse the existing purple (`#7C5CFF`) already established in the post images, so the site and the LinkedIn series read as one continuous brand, not two different projects.
- **Status color fix (directly addresses the owner's feedback on `day2_diagram.html`):** the existing diagram uses a muted amber (`#F5A524`) for the "it broke" step and a muted teal (`#2DD4BF`) for "pass," which is exactly the "shades" problem the owner flagged. The site instead uses two colors chosen for maximum, unambiguous legibility, used ONLY for pass/fail semantics and nowhere else on the site (so they keep their meaning):
  - **Fail / broke / red:** a clear, saturated red (`#EF4444` — Tailwind's `red-500`, chosen because it reads as "stop" instantly at small sizes and against a dark background, unlike an amber/orange which reads as "caution" and gets confused with the accent color family).
  - **Pass / green / done:** a clear, saturated green (`#22C55E` — Tailwind's `green-500`, same reasoning: unambiguous "go," not a muted teal that could be mistaken for the accent).
  - These two colors are reserved exclusively for pass/fail/status semantics (test results, CI status, day-done badges). The accent purple is reserved for navigation and emphasis. No third "warning" color competes with them — if something is in progress, it uses a neutral grey/outline state, not a third saturated hue, keeping the red/green pair as the only "verdict" colors on the page.
- **Generous spacing, minimal chrome.** Starlight's default docs layout already does this well; the customization budget goes into the diagrams (below), not into re-skinning the whole framework.
- **Typography:** a single clean sans-serif (Inter or the system font stack Starlight ships with by default) for body text; a monospace font for all code, test output, and file paths, so "this is real output" is visually distinct from prose at a glance.

### The per-day story-flow diagram (fixes the owner's direct feedback on `day2_diagram.html`)

The owner's feedback was specific: clear red/green not shades, more diagrammatic, less cluttered, easier to read. Concretely:

- **Simplify from a 6-step dense card row to a horizontal step-track**: a single thin connecting line with 5-6 round nodes on it (Plan, Built, Tested, Broke, Fixed, Green), each node a small circle with an icon or single word, and the DETAIL text (the paragraph) appears only in a caption below the node it belongs to, one at a time reading left to right, not packed into equal-width cards that force every box to hold the same amount of text whether it needs it or not. This removes the "wall of six similar boxes" clutter the current version has.
- **The "broke" node is the only node styled in red**, and it is the only node in the whole diagram that gets that treatment — making it visually jump out as the moment of honesty, which is the whole point of showing it. The "green" node at the end is the only node styled in green. Every other node (Plan, Built, Tested, Fixed) stays in the neutral ink/grey palette. This means red and green each appear exactly once, doing exactly one job, which is what makes them legible instead of decorative.
- **Remove the per-step colored left-border treatment** the current HTML uses (`.step.warn`, `.step.pass` with tinted borders) in favor of the node-on-a-line metaphor, which is a standard, instantly-readable "pipeline" or "timeline" shape recognizable from CI tools (GitHub Actions' own run graph uses exactly this shape), so a technical reader parses it in under a second.
- Render as static SVG (or a small dependency-free HTML+CSS component, matching the existing prototype's approach), not a JS charting library — it needs to be simple enough to also work as a standalone screenshot for LinkedIn, which is the same asset reused in two places.

### The architecture snapshot (per day)

- Deliberately small: not a redraw of the whole `ARCHITECTURE.md` system diagram every time. Show only the piece that day added, framed against a faint, muted outline of the rest of the system so the reader has context without visual noise — e.g., Day 2's snapshot highlights the Postgres RLS box and the two Weaviate tenant shards in full color/detail, while the three doors and the other stores appear as dim, low-contrast placeholders in the background.
- Use consistent iconography/shape language across every day's snapshot (a box is always a service/store, a dashed box is always "not built yet," a solid line is always "built connection," a dotted line is always "planned connection") so a reader who has seen two day-snapshots already knows how to read the tenth without a new legend.
- Same red/green discipline applies if a snapshot needs to show a pass/fail state (e.g., Day 8's red-to-green day is the one place an architecture snapshot might show a red CI badge next to a green one, and that is the only place red appears outside the story-flow diagram).

### Animation (minimal, tasteful, restrained)

The brief explicitly asks for restraint, and restraint is the correct choice for a docs site read by recruiters: any animation that feels like a marketing site undercuts the "this is an engineering artifact" credibility the site exists to build. Specific, limited set:

- A short (150-200ms) fade/slide-in on page load for the story-flow diagram's nodes, appearing left to right in sequence, so the "plan → built → tested → broke → fixed → green" narrative arc is felt as a sequence rather than a static image, once, on load. No looping, no auto-replay, no scroll-triggered replay every time the section re-enters the viewport.
- Standard Starlight nav/link hover and active-state transitions (built in, sub-100ms color transitions), left as-is — this is the "easy to navigate" part of the brief, and Starlight's defaults already satisfy it without custom work.
- No parallax, no auto-playing carousels, no confetti/celebration animation on a "green" day, no animated background. A hiring manager skimming ten pages in a row should never feel like they are being sold to.
- Respect `prefers-reduced-motion` (disable the load-in animation entirely for users who have that OS setting on) — small, correct, and free with modern CSS (`@media (prefers-reduced-motion: reduce)`).

---

## 5. Content model and update workflow

### Content model

- One Markdown/MDX file per day: `src/content/docs/days/day-XX.md` (and `milestone-0.md`). Frontmatter carries the structured fields the overview page and status badges read: `title`, `day_number`, `status` (`upcoming|in_progress|done`), `date_landed`, `non_negotiable` (boolean/string), `goal` (one line).
- Body content follows the fixed template from section 3: story flow, what shipped, architecture snapshot, proof, screenshots. The story-flow and architecture-snapshot diagrams are separate small `.svg` or `.astro` component files referenced from the day's markdown (`<StoryFlow steps={...} />` as a small Astro component taking the day's step data as props), not hand-drawn HTML duplicated 12 times — this keeps the visual language consistent by construction rather than by discipline alone.
- Screenshots live in `src/assets/days/day-XX/`, referenced by relative path from that day's markdown.
- The overview table is generated at build time from a content-collection query over all day files' frontmatter (Astro's built-in `getCollection` API), so it can never drift out of sync with the individual day pages — there is exactly one place the "is Day 4 done" fact lives.

### Per-day update workflow (ties into the project's branch-and-PR discipline)

This project is adopting branch-and-PR discipline starting Day 3 onward (open task, see `progress_log.md` / task list). The site's workflow rides the same discipline rather than inventing a separate one:

1. The day's actual build finishes: tests green, the three review skills (spec-review, senior-pass, security-review) have passed, and `progress_log.md` / `Posts/build_log.md` are updated with the real material for that day (this project already does this step for the LinkedIn posts, so the site draws from work that already exists — it does not require writing the story twice).
2. On a branch (e.g. `site/day-04`, separate from the product's own day branch — the site is a different deployable and should not share a branch with product code, to keep the diff reviewable and the two CI pipelines independent), update that day's `.md` file: flip `status` to `done`, fill in the four content sections using the real material from `build_log.md`, add the story-flow and architecture-snapshot diagram data, add screenshots if applicable.
3. Open a PR. Because this is a static content site with low blast radius (it cannot leak secrets, touch the product's data, or break the product's CI), the review bar is lighter than the product's three-skill gate, but not zero: a PR **preview deploy** (Vercel's automatic PR-preview URL, part of the free tier) is the actual review gate — look at the rendered page before merging, specifically checking (a) no fabricated numbers slipped in, (b) the private-demo line is intact, (c) the diagram reads clearly at a glance.
4. Merge to `main`. Vercel's GitHub integration deploys on merge automatically — this is the "trigger a deploy" the owner described, and on the free tier it requires no manual step beyond the merge itself.
5. The overview table updates automatically (same deploy, same build) because it is derived from frontmatter, not hand-edited separately.

This deliberately mirrors, at a smaller scale, the exact discipline the product itself is adopting (branch, PR, gate, merge, deploy), so the site is itself a small demonstration of the practice, not an exception to it.

---

## 6. Screenshot workflow

**When a screenshot is needed:** the brief correctly identifies these as the only two categories, and the plan holds to them — no day gets a decorative or stock screenshot:
1. A real UI change a reader can look at (Day 9's dashboard, Day 10's embeddable widget on a host page).
2. A CI/CD pipeline result worth showing visually (a GitHub Actions run summary, ideally the literal red-then-green sequence on Day 8).

**Options considered, honestly:**

- **Ask the owner to drop a screenshot in a known folder.** Simple, zero new tooling, and correct for anything that requires human judgment about framing (e.g., "which part of the dashboard actually tells the story"). Downside: it is a manual step the owner has to remember on top of an already dense day, and it is the kind of small thing that gets silently skipped under time pressure, which would quietly break the "screenshot when there's something visual" promise.
- **Automated safe capture via a script** (Playwright, or the lighter `shot-scraper` CLI built on the same engine) that hits a URL (the deployed dashboard, or a locally-running dev server) and saves a PNG. Pro: reliable, repeatable, no manual step to forget, and it can run as part of the same per-day update script the skill drives. Con: needs the target to actually be reachable (deployed or running locally) at the moment the screenshot is taken, and a raw full-page screenshot may need manual cropping/annotation afterward for the "which part tells the story" problem above.
- **A plain OS screenshot tool (manual, ad hoc).** Fine for a one-off, but it is really the same category as "ask the owner," just without even a known folder convention — it does not solve anything the first option does not, so it is not treated as a separate option.

**Recommended default: automated capture via `shot-scraper` (Playwright-backed) for anything that is a URL (deployed dashboard, a rendered CI-summary page), with a manual owner-drop folder as the fallback for anything that is not capture-able as a clean URL** (e.g., a terminal output the owner wants to show a specific highlighted region of, or a moment mid-interaction that a static page load cannot reproduce).

**Why this is safe:**
- `shot-scraper` (by Simon Willison) is built directly on Playwright's rendering engine, is open source, free, and actively maintained (v1.10, released June 2026). It does one job: `shot-scraper https://your-url -o out.png`, no test-runner ceremony, no paid service, runs headless.
- Playwright itself remains the standard for this class of task in 2026: Microsoft-maintained, Apache-2.0 licensed, monthly releases (v1.61.1, July 2026), with an official, well-documented GitHub Actions recipe (`npx playwright install --with-deps`) that needs no paid CI minutes beyond GitHub's own free tier allowance.
- **It is "safe" in the specific sense that matters here:** it only reads a page and renders pixels; it never submits forms, never authenticates as anything privileged, never touches the product's Supabase/Weaviate/Vertex credentials, and can be pointed at a URL with zero knowledge of the product's internals. Run it against the PUBLIC or already-shareable surface only (the deployed dashboard's landing state, a public CI-summary page) — never point it at anything that would require a real owner login or expose tenant data, since the screenshot itself becomes a public asset on the site.
- For CI-run screenshots specifically, prefer capturing GitHub Actions' own rendered summary page (or a plain terminal-output code block, styled, rather than a screenshot at all) over trying to screenshot a live terminal — a code block of real pasted output is more honest and more accessible (copyable, searchable) than a picture of text, and should be the default; a screenshot is reserved for cases where the visual arrangement itself is the point (e.g., showing red-then-green as two actual GitHub UI states side by side).

---

## 7. The skill definition

See `/Users/loto/Desktop/GEN/Skills/build-log-site/SKILL.md` (DRAFT). Summary of its shape: given a day that has finished (tests green, the three product review skills passed, `build_log.md` updated), the skill diffs that day's real material against the site's current day-XX.md, drafts the update (flip status, fill the four sections, generate diagram data, decide if a screenshot is needed and via which path), opens it on a branch, and stops for owner review before merge/deploy — it never merges or deploys automatically, mirroring how the product's own skills block rather than auto-approve.

---

## 8. Risks and open decisions for the owner

1. **Repo visibility is unresolved and affects the site.** The site's "About" page and overview table want to link to the repo. If the `honest-agent` repo stays private (consistent with "demo is private"), the site should say so plainly rather than link to a 404 or omit the topic silently. **Decision needed:** will the repo itself ever go public (even read-only, even after the 12 days), or does the site stand alone with no repo link at all? This changes the About page's wording now, not later.
2. **Scope discipline risk (flagging honestly): this is a second live project running in parallel with a 12-day sprint that already has three non-negotiable spine days.** The plan above is intentionally the floor, not a ceiling, but the owner should actively resist the temptation to keep polishing the site's visual design once it is good enough to be legible and honest — the product's Day 2/3/8/9 non-negotiables must never lose time to site polish. Recommend treating the site's initial build (seeding all 12 pages, Days 1-2 filled in, the diagram components built) as a single bounded session, not an ongoing parallel workstream, and then each subsequent day's update as a small, capped (~15-30 minute) task via the skill, not a re-design opportunity.
3. **Screenshot capture timing for Days 9 and 10 needs a decision now, not on the day.** Day 9 (dashboard + deploy) and Day 10 (embeddable widget) are the two days where a real screenshot matters most, and the automated capture path depends on the dashboard/widget being reachable at a stable URL at the moment the screenshot script runs. **Decision needed:** confirm the Day-9 deployed URL will stay live long enough after that day's session to run the capture script against it (rather than only being spun up transiently), or plan to run the capture step as part of that day's own session before anything is torn down.
4. **Pin the Starlight/Astro version at project creation and do not upgrade mid-build.** Not a decision so much as a guardrail worth the owner's explicit sign-off, because Starlight has a real history of breaking changes roughly every couple of months; upgrading mid-sprint for no reason is a pure risk with no benefit here.
5. **Domain/URL.** Does this deploy to a Vercel-provided subdomain (e.g. `honest-agent-log.vercel.app`, free, zero setup) or does the owner want a custom domain? A custom domain is not free (domain registration cost), which conflicts with the "free and card-free where possible" constraint unless the owner already owns a domain to point at it. Recommend the free Vercel subdomain unless the owner already has a domain sitting idle.

### One thing flagged as possibly over-scoped

The brief asks for the site to "either ask the owner for a screenshot or capture one itself with a safe tool" for every visual moment. Building a fully automated capture pipeline (a script wired into the skill that runs headless Playwright/`shot-scraper` against a live URL, saves the asset, and inserts it into the day's markdown) is more infrastructure than a 12-day side project strictly needs. **Recommendation to simplify further than the brief's ceiling allows:** implement the automated path for exactly the two days that need it (9 and 10, plus optionally 8 for the CI red/green shot), as a small standalone script invoked manually when that day lands, rather than building it as a fully wired, always-on step in the skill from day one. This keeps the skill itself simpler (its job is content + diagrams + PR, not screenshot orchestration for every single day) and avoids building automation for a need that only actually arises three times in the whole 12-day arc.
