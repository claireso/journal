---
'journal': major
---

Replace next-auth with better-auth

Better-auth is a more secure and feature-rich authentication library than next-auth. The migration will enable the upgrade to Next.js 16 in the future.

To update your instance of Journal, replace the old environment variables with the new ones:

- `AUTH_URL` replaced with `BETTER_AUTH_URL`
- `AUTH_SECRET` replaced with `BETTER_AUTH_SECRET`
