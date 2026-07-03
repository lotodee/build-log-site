---
title: "Day 10 — Embeddable widget"
description: "A Lit + Shadow DOM widget, isolated, fetch-streaming, bundled as a single CDN file, tested on three host pages."
day_number: 10
status: upcoming
goal: "Embeddable Lit/Shadow-DOM widget: isolated, fetch-streaming, CDN bundle, works on three host pages without breaking them."
non_negotiable: false
---

## The goal

Build the actual delivery mechanism the whole product depends on: a single script tag a site owner drops onto their page. Lit 3 with Shadow DOM isolation (`:host { all: initial }`) so the widget cannot clash with or leak into the host page, fetch-based streaming for the answer, bundled as one file via Vite library mode, and verified on three different host pages to prove it doesn't break any of them.

This day has not started yet. Once it lands, this page will be rewritten in place with the real story, proof, and architecture snapshot, sourced from the project's build log.
