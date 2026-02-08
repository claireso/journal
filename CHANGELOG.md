# journal

## 3.0.0

### Major Changes

- 8bfe69f: Replace next-auth with better-auth

  Better-auth is a more secure and feature-rich authentication library than next-auth. The migration will enable the upgrade to Next.js 16 in the future.

  To update your instance of Journal, replace the old environment variables with the new ones:
  - `AUTH_URL` replaced with `BETTER_AUTH_URL`
  - `AUTH_SECRET` replaced with `BETTER_AUTH_SECRET`

## 2.7.2

### Patch Changes

- af3a040: Bump next (security)

## 2.7.1

### Patch Changes

- 8aad549: Bump next (security)

## 2.7.0

### Minor Changes

- 671b93c: Update dependencies

## 2.6.1

### Patch Changes

- afe9bf4: Update dependencies

## 2.6.0

### Minor Changes

- ec76fc4: feat: use next to optimize images

  _Note: not available in Docker for the moment_

## 2.5.0

### Minor Changes

- c4f9362: feat(notification): rework the workflow of a subscription

  _Note: it is recommended to generate new public and private notification keys_

## 2.4.0

### Minor Changes

- bdf6e2b: Use node 22

## 2.3.0

### Minor Changes

- 4db3b91: implement a caching strategy
- 2755cd4: Update dependencies
- 2d32a67: Next.js updated to version 15
- 1c7690e: Rewrite admin with react server components

### Patch Changes

- fbeb097: Admin: improve user interface on mobile and widescreen displays

## 2.2.1

### Patch Changes

- 5d24d8b: Fix: Sort photos correctly by adding a secondary sorting criterion

## 2.2.0

### Minor Changes

- ed35d31: New admin user interface

## 2.1.0

### Minor Changes

- a2ce2f2: Refactor: hexagonal architecture

### Patch Changes

- c2031fe: refactor: update wording to delete a photo/subscription

## 2.0.0

### Major Changes

- 9f2ff9c: New feature: The selection of a background color is now available during the creation of the photo

  Breaking changes:
  - creation of the table `media` is needed
  - creation of column `media_id` is needed

  See the file `setup-database.sql` to get all information to reproduce on your database

  **Note:** no data migration needed

## 1.3.5

### Patch Changes

- 453948e: Fix pagination (add redirection on 404)

## 1.3.4

### Patch Changes

- 8d696d9: add feedback to user when the database is empty (no published photo - no subscription)
- 754111d: use next cache to improve performance

## 1.3.3

### Patch Changes

- a5e5575: Improve script installation and installation with Docker
- dd8b58c: Enable web push notification again

## 1.3.2

### Patch Changes

- 1b3a65f: Update github workflow

## 1.3.1

### Patch Changes

- 1650ed7: Automatic deployment on server when tag has been pushed

## 1.3.0

### Minor Changes

- 166017a: feat: add schema validation with zod

## 1.2.1

### Patch Changes

- 56ec125: fix: update changeset config to generate tag in CI

## 1.2.0

### Minor Changes

- 70d47db: chore: migrate to storybook 8
- 68454be: chore: migrate to react-query 5

### Patch Changes

- 129c770: Update github actions to use node 20

## 1.1.2

### Patch Changes

- 980beee: update dependencies

## 1.1.1

### Patch Changes

- 4b48807: Update changesets configuration

## 1.1.0

### Minor Changes

- d6b6c92: Use changesets to genereate changelog
