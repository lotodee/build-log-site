---
title: "Day 3 — OCR/vision PDF spike"
description: "Native text extraction, gated OCR, Gemini vision for image pages, poison PDFs isolated in a subprocess."
day_number: 3
status: upcoming
goal: "OCR/vision PDF spike: native text to gated OCR to Gemini-vision for image pages; poison PDFs parsed in a subprocess to a dead-letter queue."
non_negotiable: "Poison-PDF survival"
---

<div class="hlog-nonneg">
  <b>Non-negotiable.</b> A poison PDF must not take down the ingestion worker — it has to die in an isolated subprocess and land in a dead-letter queue, not crash the service.
</div>

## The goal

Route each PDF page through the cheapest path that works: native text extraction first, gated OCR only for scanned pages, Gemini vision only for image- or vector-heavy pages. Parse every PDF inside a timeout-bounded subprocess, so a poison PDF that segfaults the underlying C library kills a subprocess, not the worker.

This day has not started yet. Once it lands, this page will be rewritten in place with the real story, proof, and architecture snapshot, sourced from the project's build log.
