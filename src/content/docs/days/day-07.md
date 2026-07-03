---
title: "Day 7 — Observability + the non-flapping eval gate"
description: "Logfire, Sentry, a DeepEval golden set, and a three-lane CI gate built so the headline red-to-green artifact is reproducible by construction."
day_number: 7
status: upcoming
goal: "Observability + the non-flapping eval gate: Logfire, Sentry, DeepEval golden set, the three-lane DAG gate in CI."
non_negotiable: false
---

## The goal

Wire full tracing (Logfire) and error capture (Sentry), then build the three-lane evaluation gate: Lane 1 is plain no-LLM assertions plus DeepEval Tool Correctness (the reproducible core that can never flap), Lane 2 is the DAG faithfulness metric with the judge explicitly pinned to Gemini and a measured threshold margin, and Lane 3 is warn-only judged metrics that never block. This changes the Day-8 red-to-green demo's mechanics: the red is driven through Lane 1, or far past Lane 2's margin, so the headline artifact is reproducible by construction, not by hope.

This day has not started yet. Once it lands, this page will be rewritten in place with the real story, proof, and architecture snapshot, sourced from the project's build log.
