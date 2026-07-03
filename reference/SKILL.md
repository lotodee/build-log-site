---
name: build-log-site
status: DRAFT / PLANNED — the site does not exist yet. This skill cannot run until the Astro Starlight site from `Planning/status_site_skill_plan.md` is built and deployed. Do not invoke until then.
description: Given a build day that has finished (tests green, spec-review/senior-pass/security-review all passed, progress_log.md and Posts/build_log.md updated with the real material), update that day's page on the build-in-public status site, decide whether a screenshot is needed, open a PR, and stop for owner review before deploy. Use this after a day is verified done and its posting-log material exists, never before. Does not write LinkedIn post copy (that is the posting strategist's job) and does not touch the product's own repo, CI, or code.
---

# Build Log Site — Day Update

**DRAFT.** This skill is planned, not built. It is written now so its shape is agreed before the site exists, per `Planning/status_site_skill_plan.md` section 7. Do not run it until that plan is approved and the site is live. When the site is built, remove this notice and the `status:` frontmatter line above.

You are updating the build-in-public status site for `honest-agent` with one day's real, verified material. This site is a resume artifact and a process log, not the product. Be diff-aware, be honest, and block rather than guess. You never invent content, never merge, and never deploy — you draft, and you stop.

## Step 0 — Confirm the day is actually done before touching anything

Do not update a day's page on the strength of "it looks done." Check, in order:

1. `progress_log.md` shows that day's row as `done` (or `done, verified`), not `in progress` or blank.
2. `Posts/build_log.md` has a real milestone entry for that day, with real facts: what was built, the actual test/proof output, and the honest wrinkles (what broke, what a review caught). If this entry does not exist yet, STOP and say so — this skill draws content from `build_log.md`, it does not generate new claims about what happened.
3. The three product review skills (spec-review, senior-pass, security-review) have a passing verdict recorded for that day's work. If any is missing or BLOCKED, STOP. A site update is not how a day gets marked done; it is what happens after a day is already, verifiably, done.

If any check fails, report exactly which one and do not proceed.

## Step 1 — Read the real source material, not memory

Always re-read fresh, never rely on a prior run's memory of these files:

1. `Posts/build_log.md` — the day's milestone entry: what was built, the real proof/test output, the honest wrinkles (what broke, what a review caught, how it was fixed).
2. `progress_log.md` — the day's status row and date.
3. The relevant slice of `Planning/ARCHITECTURE.md` (section 3 for code architecture, section 7 for the day-by-day preview) — this is where the day's "what this added to the system" architecture snapshot comes from. Use only what that day's entry says was actually built, not what is still PLANNED elsewhere in the document.
4. The site's current page for that day (`src/content/docs/days/day-XX.md` or `milestone-0.md`), to see its current state (should currently be `status: upcoming` with only header/goal/non-negotiable filled in, unless this is a re-run).
5. `Planning/status_site_skill_plan.md` sections 3 and 4, for the exact per-day template and the visual/diagram rules (clear red for fail, clear green for pass only, no other status color; story-flow as a node-on-a-line sequence; architecture snapshot shows only what that day added, muted context for the rest).

## Step 2 — Draft the day's page update, diff-aware

Open the day's existing `.md` file and produce a diff against it, not a fresh rewrite. Fill in exactly these fields, and no others invented:

- **Frontmatter:** flip `status` from `upcoming` to `done` (or `in_progress` if the day is genuinely partial — check `progress_log.md`'s exact wording rather than assuming full completion), set `date_landed`.
- **Story flow** (the Plan / Built / Tested / Broke / Fixed / Green sequence): pull directly from `build_log.md`'s "what was done" and "honest wrinkles" material for that day. If a day had no real wrinkle (nothing broke, no review caught anything), do not invent one — omit the "Broke" node for that day rather than fabricate friction that did not happen. Every word here must trace to a sentence in `build_log.md`; if you cannot point to the source sentence, do not write the claim.
- **What actually shipped:** a short prose recap, close to `build_log.md`'s own words, not embellished. Preserve the owner's voice rules: plain English, no em dashes, no buzzwords, honest about built vs. planned.
- **Architecture snapshot:** the smallest possible diagram of what this day added (which door, which store, which seam), using the fixed shape language (solid box = built, dashed box = not yet, solid line = built connection, dotted line = planned). Do not redraw the whole system; show only the delta.
- **Proof:** the real command output, copy-pasted verbatim from `build_log.md` (ruff/mypy/pytest counts, the isolation-test count, the CI run link once real CI badges exist). Never paraphrase a number. Never round up. If a count is not in the source material, leave the field out rather than guess.

## Step 3 — Decide on a screenshot, and say which path you used

Per `Planning/status_site_skill_plan.md` section 6:

- If this day has a real UI change (Day 9 dashboard, Day 10 widget) or a CI/CD result worth showing visually (notably Day 8's red-then-green), a screenshot belongs on this page.
- Default path: automated capture (`shot-scraper` or Playwright) against a live, reachable URL — the deployed dashboard/widget, or a rendered CI-summary page. Only ever point this at a public or already-shareable surface; never at anything requiring the owner's real login or exposing tenant data, because the output becomes a public asset on the site.
- Fallback path: ask the owner to drop a screenshot into the known folder (`src/assets/days/day-XX/`) when the moment is not a clean capturable URL (a specific highlighted terminal region, a mid-interaction moment).
- For CI proof specifically, prefer a real pasted code block of the actual output over a screenshot of a terminal — more honest, searchable, and accessible. Reserve a screenshot for when the visual arrangement itself is the point (e.g., two GitHub Actions run states side by side).
- If no visual moment exists for this day, say so explicitly and leave the section out. Do not add a decorative or stock image to fill space.

## Step 4 — Branch, PR, and STOP — never merge, never deploy

1. Create or use a site-specific branch (e.g. `site/day-XX`), separate from the product's own branch for that day. The site is a different deployable; keep the diff reviewable and the two CI/deploy pipelines independent.
2. Commit the day's `.md` update (and any new diagram data file or screenshot asset) with a clear conventional-commit message (e.g. `docs(site): fill in day 4 build log entry`).
3. Open a PR. Include in the PR description: which source sentences in `build_log.md` this content traces to, which screenshot path was used (or why none was needed), and a link to Vercel's automatic PR-preview URL once it appears.
4. **STOP here.** Do not merge. Do not trigger a production deploy. Report back to the owner with the PR link and a short summary of what changed, and let the owner review the rendered preview before merging. Merging is what triggers the real deploy (Vercel deploys on merge to `main`), and that decision belongs to the owner, the same way the product's own review skills block rather than auto-approve.

## Step 5 — Verdict

Give one of two outcomes.

**DRAFTED**, with the PR link, a one-line summary of what was added, which screenshot path was used (or "none needed, no visual moment this day"), and explicit confirmation that every claim in the update traces to `build_log.md` or `progress_log.md` — no invented numbers, no invented wrinkles, no claim about a day that has not actually finished.

**BLOCKED**, if Step 0's checks fail (day not verified done, source material missing, a review skill not yet passed) or if you cannot trace a piece of content back to real source material. State exactly what is missing and what needs to happen before this skill can run for that day.

## What this skill does not do

- It does not write or schedule LinkedIn posts (that is the separate posting-strategist workflow reading the same `build_log.md`).
- It does not touch the `honest-agent` product's own repo, CI config, or code.
- It does not merge its own PR or trigger its own deploy.
- It does not fill in a day's page before that day is verified done, even partially, even as a "preview."
- It does not invent metrics, screenshots, or story beats. If the real material is thin, the page stays thin and honest, not padded.
