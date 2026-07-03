---
title: "Day 5 — Agent + grounded answer"
description: "PydanticAI, tenant-scoped hybrid retrieval, Gemini behind a seam, a typed verdict on every answer."
day_number: 5
status: upcoming
goal: "Agent + grounded answer: PydanticAI, tenant-scoped hybrid retrieval, Gemini behind the interface, typed verdict."
non_negotiable: false
---

## The goal

Replace the Day-1 typed stub with a real agent: PydanticAI running against Gemini via Vertex AI, calling a tenant-scoped hybrid-search retrieval tool, and returning a typed result where the honesty verdict is a required field, not an optional extra. The model never grades its own answer inside the same generation — the faithfulness grade is computed after the run, against the actually-retrieved chunks.

This day has not started yet. Once it lands, this page will be rewritten in place with the real story, proof, and architecture snapshot, sourced from the project's build log.
