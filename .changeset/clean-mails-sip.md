---
'journal': patch
---
Fix session cookie configuration and add admin proxy middleware

- Fix `setSessionCookie` `dontRememberMe` flag to properly align cookie maxAge with the cookieCache configuration
- Configure session `expiresIn` to 1h with a 5-minute refresh window
- Add `proxy.ts` middleware to protect `/admin` routes and handle session cookie refresh on navigation
- Upgrade `better-auth` from 1.6.2 to 1.6.9
