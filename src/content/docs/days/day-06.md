---
title: "Day 6 — Refusal + prompt-injection guardrail"
description: "An honest refusal as a modeled outcome, a pre-screen, and datamarking so retrieved content can never masquerade as instructions."
day_number: 6
status: upcoming
goal: "Refusal + prompt-injection guardrail: honest refusal as a first-class outcome; pre-screen and spotlighting; blocks 'ignore previous instructions'-style attacks."
non_negotiable: false
---

## The goal

Layer defenses by cost: deterministic stripping of hidden-text tricks at ingestion time, datamarking of every retrieved chunk so the model treats it as quoted data rather than instructions, a cheap classification pre-screen on the visitor's query, and the faithfulness verdict itself as the last line of defense. An honest refusal is a modeled outcome, not an exception path.

This day has not started yet. Once it lands, this page will be rewritten in place with the real story, proof, and architecture snapshot, sourced from the project's build log.
