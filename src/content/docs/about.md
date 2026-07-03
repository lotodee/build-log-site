---
title: About this site
description: How this build log is written, sourced, and kept honest.
---

This site is a dated build log for `honest-agent`, a 12-day build. It is not the product, and it is not a marketing site — see the note on the [overview page](/).

## The honesty rule

Every entry on this site is written **after** that day's tests and reviews pass, not before, and not to make the day look better than it was. The workflow, concretely:

1. A day's build finishes: tests green, the project's review passes (spec review, senior-engineering pass, security review) have a recorded verdict, and the real facts are written down in the internal build log.
2. That day's page is updated from those real facts only. If a fact is not in the source material, it does not appear on this site — no invented numbers, no invented story beats, no rounding up a test count.
3. The update goes out as a pull request with a preview deploy. The rendered page gets checked before merging: no fabricated numbers, the private-demo line still intact, the diagram still reads clearly.
4. Merging to the main branch is the only thing that triggers a real deploy.

If something breaks on a day, it stays on the page. The failures are the point — a review pass that never finds anything is a review pass that isn't checking hard enough, and this site's whole reason to exist is to show that the checking is real.

## Repo and code

The `honest-agent` product repo's visibility (public or private) is a decision the owner is still making. This site does not currently link to it. If that changes, this page will say so plainly rather than link to something that 404s.

## What this site is not

- Not a live demo. There is no embedded widget, no "try it" button, no product front door here.
- Not a pitch. No pricing, no feature list aimed at a buyer, no signup form.
- Not a second source of truth. If this site and the project's internal build log ever disagree, the internal build log wins, and this site gets corrected.
