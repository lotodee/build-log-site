---
title: "Day 4 — Ingestion end-to-end"
description: "Presigned upload, a durable Postgres queue, idempotent upserts, status, dead-letter handling, and backpressure."
day_number: 4
status: upcoming
goal: "Ingestion end-to-end: presigned upload, queue, idempotent upsert, status, dead-letter queue, backpressure. Plus the one-hour Weaviate-hosting spike so Day 9's deploy isn't ambushed."
non_negotiable: false
---

## The goal

Wire the full ingestion path: the owner requests a presigned upload slot, the file lands in storage, a durable Postgres-backed queue (`FOR UPDATE SKIP LOCKED`) claims and processes jobs idempotently, failed jobs land in a queryable dead-letter state with a reason, and a per-tenant pending-job ceiling provides backpressure. This day also carries a one-hour spike into where Weaviate lives in the deployed demo, so the Day-9 deploy isn't ambushed by a hosting surprise.

This day has not started yet. Once it lands, this page will be rewritten in place with the real story, proof, and architecture snapshot, sourced from the project's build log.
