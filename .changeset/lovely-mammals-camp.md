---
"journal": patch
---

Add PostgreSQL query tracing via OpenTelemetry instrumentation.

Fix circular JSON error when uploading media — `FormData.entries()` was missing, causing DOM internals to leak into the parsed body and crash the logger serializer.
