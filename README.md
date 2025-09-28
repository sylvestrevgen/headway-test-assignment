## Headway Test Assignment — Game App

A small game app built with Next.js (App Router) and TypeScript. State is managed with Redux Toolkit, and server data is fetched with RTK Query. The app follows the Feature-Sliced Design (FSD) architecture.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State**: Redux Toolkit
- **Server data**: RTK Query
- **Testing**: Vitest + Testing Library
- **Linting/Formatting**: ESLint + Prettier

## Architecture (FSD)

This app is organized using the Feature-Sliced Design (FSD) approach to keep features isolated and scalable.

- **`app/`**: Next.js application entry, routes, layouts, and API routes
  - **`app/api/questions/route.ts`**: API endpoint serving questions from local data
  - **`app/game`**, **`app/result`**: route pages and styles
  - **`app/providers`**: application-level providers
    - **`app/providers/store`**: Redux store setup and `StateProvider` wrapper
- **`features/`**: independent feature modules
  - **`features/game/`**: game feature (slice, selectors, hooks, UI)
    - `model/`: business logic (Redux slice, RTK Query API, types, utils)
    - `ui/`: feature components (e.g., `answer`, `prize-progress`)
- **`shared/`**: reusable UI components used across features (e.g., `shared/ui/button`)
- **`data/`**: local data files (e.g., `questions.json`)

This structure promotes clear boundaries, easier testing, and incremental growth of features without coupling.

## Local API

- **GET `/api/questions`**: Returns the list of questions loaded from `data/questions.json`.

## Scripts

- **Dev**: `npm run dev` (uses Turbopack)
- **Build**: `npm run build` (uses Turbopack)
- **Start**: `npm run start`
- **Lint**: `npm run lint`
- **Test**: `npm run test`

## Git Hooks (Husky + lint-staged)

This project uses Husky and lint-staged to enforce code quality:

- **pre-commit**: runs ESLint (and Prettier via lint-staged) on staged files
- **pre-push**: runs the test suite (Vitest)

Hooks are installed automatically via the `prepare` script. If hooks are missing (e.g., after cloning), run:

```bash
npm run prepare
```

## Setup & Run

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app at `http://localhost:3000`.

4. Build and run in production mode:

```bash
npm run build
npm run start
```

5. Lint and test:

```bash
npm run lint
npm run test
```

## Notes on Tests

For this test assignment, unit tests were intentionally minimized. Only a single unit test is provided for the `Answer` component located at `features/game/ui/answer/answer.test.tsx`. No other unit tests were created.

## Alternatives for State and Server Data

While Redux Toolkit and RTK Query are solid defaults, there are a different choices might fit better depending on project:

- **Local/UI State — Zustand**
  - Lightweight and simple store for local state without boilerplate
  - Great for colocated state per feature/component tree
  - Ecosystem middlewares (persist, immer) for persistence and ergonomics

- **Server Data — TanStack Query**
  - Powerful caching, background refetching, mutations, and stale-time control
  - Excellent for REST/GraphQL without needing normalized global state
  - Integrates well with Next.js App Router and server components

- **When to choose what**
  - Prefer **Zustand + TanStack Query** for apps dominated by server data and minimal cross-feature global state
  - Prefer **Redux Toolkit + RTK Query** when you have significant shared client state, complex derived state, or need RTK’s opinionated patterns and devtools
  - For purely server-driven flows, consider **Next.js Server Components** with `fetch()` caching and revalidation, using a minimal client state store where needed
