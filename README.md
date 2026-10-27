# Ecommerce Operations

An e-commerce operations management system.

**Stack:** NestJS, MongoDB, React, TanStack Router & Query, shadcn/ui, Tailwind CSS v4, pnpm Workspaces.

## Project Structure

```text
api/
  src/
    app/                  # Root module and application options
    app-config/           # Typed configuration
    auth/                 # Authentication and refresh-token lifecycle
    users/                # User storage, profile, development bootstrap
  test/                   # Auth, users, and application e2e suites
web/
  src/
    app/                  # Bootstrap, layouts, providers, navigation
    features/auth/        # Login, registration, session management
    pages/                # Home, login, registration, profile
    routes/               # Thin TanStack Router route definitions
    shared/               # API client, configuration, UI, utilities
docs/                     # Engineering and setup documentation
.github/workflows/        # CI pipelines
scripts/                  # Commit-message validation
```

## Backend

The API uses NestJS and Mongoose with typed configuration, validation, rate limiting, and JWT authentication. Refresh tokens use HttpOnly cookies with rotation and reuse detection.

Available endpoints use the `/api` prefix:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /users/me` (authenticated)

See [API architecture](api/ARCHITECTURE.md) for conventions and endpoint details.

## Frontend

The React application follows four layers: `app`, `pages`, `features`, and `shared`. TanStack Router route files delegate rendering to page components. Shared UI lives in `web/src/shared/ui/`.

Available pages are `/`, `/login`, `/register`, and the protected `/profile` page. Guests see a welcome page and authentication controls; signed-in users see a personalized welcome, sidebar, profile access, and sign-out.

See [web architecture](web/ARCHITECTURE.md) for frontend conventions.

## Development Setup

Requires exactly Node.js 24.22.1 LTS, pnpm 12.15.0, and MongoDB. Node and pnpm version mismatches are rejected by the project. No existing database or hosting project is assumed.

1. Install Node.js 24.22.1 LTS and pnpm 12.15.0 (`npm install --global pnpm@12.15.0`), then install dependencies from the repository root:

   ```sh
   pnpm install
   ```

2. Copy `api/.env.example` to `api/.env` and configure it:

   ```env
   NODE_ENV=development
   CREATE_DEFAULT_ADMIN=true
   DB_URL=mongodb://localhost:27017/ecommerce-operations
   TEST_DB_URL=mongodb://localhost:27017/ecommerce-operations-test
   FRONTEND_URL=http://localhost:5173
   ```

   When enabled outside production, the existing development bootstrap creates `belal@gmail.com` with password `Ecommerce@2026`. Set `CREATE_DEFAULT_ADMIN=false` to disable it. There is no standalone database seeding command.

3. Copy `web/.env.example` to `web/.env`:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the API and web app in separate terminals:

   ```sh
   pnpm dev:api
   ```

   ```sh
   pnpm dev:web
   ```

The API defaults to port 3000 and Vite to port 5173.

## Checks

```sh
pnpm lint
pnpm build
pnpm test:api:e2e
```

Backend e2e tests require a dedicated `TEST_DB_URL` database: the suites drop that database during setup. Never point it at application data. The API lint script applies automatic fixes.

## Documentation

- [Deployment guide](docs/deployment-guide.md): configure new Heroku, Vercel, and MongoDB services before deploying.
- [Dependency upgrades](docs/dependency-upgrades.md): pinned tooling, compatibility decisions, and validation.
- [CI pipeline](docs/ci-pipeline.md): lint, build, and backend tests.
- [Authentication design](docs/authentication-design.md): token rotation and client session lifecycle.
- [Testing strategy](docs/testing-strategy.md): e2e approach and retained coverage.
- [Engineering decisions](docs/engineering-decisions.md): architectural trade-offs.
- [Commit conventions](docs/commit-conventions.md): ticket-based commit format.
