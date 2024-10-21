# journal

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
