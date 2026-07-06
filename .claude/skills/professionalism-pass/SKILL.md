---
name: professionalism-pass
description: A final polish-and-credibility gate run BEFORE anything is published — a LinkedIn post, a build-log day page, a README, any public-facing artifact. Its job is to refuse to let anything unprofessional, unfinished-looking, or uncertain-sounding go out under our name. It hunts every visible placeholder (empty screenshot slots, "coming soon", TODO, reserved-slot notes, broken links, lorem text) and forces it to be filled with a real asset or removed. It interrogates tone: every deferred or stubbed thing must read as a deliberate, reasoned, sequenced choice — never as being blocked, uncertain, or building blind. It checks that the whole thing reads as one clear, confident story. It BLOCKS until every placeholder is resolved and every hedge is either backed by a stated reason or cut. Use it as the last step before publishing.
---

# Professionalism Pass

You are the last set of eyes before something goes out in public under our name. Pure professionalism is the product's first impression, so nothing half-finished, nothing that reads as uncertain, and nothing that quietly says "building blind" is allowed to ship. You are not judging whether the work is good; the build report and the review skills already did that. You are judging whether the *presentation* of it is professional, finished, and confident.

Run this on the exact artifact about to be published: the post copy in `Posts/posts_log.md`, the build-log page (`src/content/docs/days/day-*.mdx`), a README, or any public page. Read it end to end as a skeptical stranger who has never seen the project would.

## Step 1 — hunt every visible placeholder, block on each
A placeholder that renders on a public page is the single most unprofessional thing we can ship. Find every one:
- Empty or reserved screenshot slots (e.g. `<ScreenshotSlot ... />` with a "reserved for a future..." / "to be added" note, an empty image box, an `alt` with no `src`).
- "Coming soon", "TODO", "TBD", "WIP", "placeholder", "lorem", "example.com", a link that 404s or points nowhere, an image path with no file behind it.
- Template scaffolding left in: an unfilled `## POST #N` block, `Image path` still set to the default `post01_anchor.png` when a real image was supposed to exist, boilerplate from the per-post template.

For each one, exactly two outcomes are allowed, and you must force one:
1. **Fill it** with the real asset (a real screenshot, the real link, the real number), or
2. **Remove it entirely** so nothing empty renders.

"Leave it, we'll add it later" is not an allowed outcome for anything that renders publicly. A reserved empty box on a live page is a BLOCK. If a day genuinely has no capturable visual yet, the slot is removed, not left showing a note about a future screenshot.

## Step 2 — interrogate the tone: is anything sounding uncertain or blind?
Read every sentence and flag anything that makes us sound unsure, unserious, or stuck:
- Hedges: "for now", "somehow", "I think", "hopefully", "not sure", "seems to", "should work".
- Blocked-sounding framing for something that is actually a chosen order of work: "no credential", "can't yet", "blocked on", "waiting on", "still trying to".
- A deferred or stubbed thing described as a gap or an excuse rather than a deliberate, sequenced decision.

The rule: every stubbed, deferred, or not-yet-done thing must read as a plan being executed in order, with the reason stated out loud. "The live call lands when ingestion goes end to end, because Day 3's job was to prove the pipeline survives a malformed file" is professional. "There's no credential in my build environment right now" is not — it says the same fact but sounds blocked and uncertain. Rewrite every instance into the confident, reasoned version, or cut it.

## Step 3 — is it one clear story?
- Does it read start to finish as a single, coherent narrative, or as disconnected facts? A stranger should follow *what we did and why* without prior context.
- Every claim has a reason attached. "We did X" is weak; "We did X because Y" is professional and is what carries the reader.
- No dangling references: text that mentions a screenshot/number/link that is not actually present; a day number that contradicts the stub ledger or the build report; a claim the build report does not support.

## Step 4 — surface polish
- Voice rules honored: first person, plain English, NO em dashes, no fabricated metrics, short lines.
- Formatting is clean: no broken markdown, no leftover template markers, hashtags present (3 to 5), the link (if any) is real and goes in the first comment per the posts-log rules.
- Nothing internal leaks: no secrets, no credential or env-var names, no project identifiers, nothing under a do-NOT-post flag from the build report.

## Verdict
List findings grouped, most damaging first. For each: what it is, why it reads as unprofessional or uncertain, and the exact fix (fill it, cut it, or rewrite the line).

PASS only if: zero visible placeholders remain (every one filled or removed), zero uncertain/blocked-sounding framing remains (every deferral reads as a reasoned, sequenced choice), the piece reads as one clear story where every claim carries its reason, and no internal or flagged content leaked. Otherwise BLOCKED, with the list. A single empty screenshot box or a single "for now" is enough to block — polish is not optional here.
