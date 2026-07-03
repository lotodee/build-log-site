---
title: "Day 8 — Reproducible red to green"
description: "Push a bad change, watch CI go red, fix it, watch it go green again — reproducibly, plus the agentic metric and the online scorer."
day_number: 8
status: upcoming
goal: "Red to green: push a bad change, CI goes red, fix it, CI goes green, reproducibly. Plus an agentic metric and the online referenceless scorer."
non_negotiable: "Reproducible red-to-green"
---

<div class="hlog-nonneg">
  <b>Non-negotiable.</b> The red-to-green sequence must be reproducible on demand, not a one-time lucky screenshot.
</div>

## The goal

Demonstrate the eval gate actually gates: deliberately introduce a regression, watch the three-lane CI gate catch it and go red, fix the regression, watch it go green — and be able to repeat that sequence, not just show it once. This is the one place outside the story-flow diagram where a red state next to a green state might appear side by side in an architecture snapshot.

This day has not started yet. Once it lands, this page will be rewritten in place with the real story, proof, and architecture snapshot, sourced from the project's build log.
