# Ecommerce Operations API Architecture & Conventions

This document outlines the core architectural patterns, project-specific conventions, and development workflows for the Ecommerce Operations backend.

---

## Architecture & Project Conventions

### 1. Shared Types (`types/public/`)

Modules must enforce explicit public/private boundaries for TypeScript types:

- **Private Types**: Types used exclusively within a module (e.g., local DTOs, helper interfaces) stay inside `types/` or `types/dtos/`.
- **Public Shared Types**: Any type, interface, or option class exposed to other modules **must** be placed in a `types/public/` subfolder (e.g., `auth/types/public/authenticated-user.type.ts`, `app/types/public/options/app.options.ts`).
- **Re-exports**: Public types are re-exported via `types/index.ts` for clean imports.

### 2. Strongly-Typed Configuration System

Environment variables are loaded via `@nestjs/config` and immediately mapped into strongly-typed option classes:

- Controllers and services **never** access `process.env` directly.
- Modules inject `AppConfigService` to read typed configurations (`.appOptions`, `.authOptions`).
- Env var mapping is centralized in `ConfigFactory`:

### 3. Dual-Token Auth & Session Security

- **Access Token (JWT)**: Short-lived (15 min), stateless, validated via `JwtStrategy` without DB lookups.
- **Refresh Token (Opaque)**: Long-lived (7 days), stateful, delivered via `HttpOnly` cookie.
- **SHA-256 Hashing**: Only SHA-256 hashes of refresh tokens are persisted in MongoDB; raw tokens are never saved.
- **Reuse Detection**: Refresh token rotation links old tokens to new ones. Re-using a consumed refresh token immediately revokes all tokens within the entire session family (`sessionId`).
- **Password Hashing**: Passwords are hashed using **Argon2id** (`argon2`).

### 4. Custom Decorators (`@GetUser()`)

Use custom parameter decorators to extract authenticated user data cleanly in controllers:

```typescript
@Get('me')
@UseGuards(JwtAuthGuard)
getProfile(@GetUser() user: AuthenticatedUser) {
  return user;
}
```

### 5. Development User Bootstrap

Non-production environments create a default development user on initial boot when `CREATE_DEFAULT_ADMIN=true`. This is handled by `UsersService`; there is no standalone seed command.

---

## Development & Testing Workflows

### E2E Testing Strategy

All backend tests are end-to-end suites located in `api/test/` using **Pactum JS** against a dedicated test database (`TEST_DB_URL`).

Every endpoint must be tested across 4 lenses:

1. **Input Validation**: `400 Bad Request` on invalid/missing fields (enforced by global `ValidationPipe({ whitelist: true })`).
2. **Authentication & Authorization**: `401 Unauthorized` or `403 Forbidden` on missing/invalid tokens or non-owner mutation attempts.
3. **Business Logic**: Correct status codes (`200`, `201`, `204`) and return payload shapes.
4. **Side Effects**: Direct DB assertions via Mongoose models (token family revocation, hash storage, document counts).

---

## API Reference

### Auth — `POST /api/auth/*`

| Endpoint              | Auth Required | Description                                                                             |
| --------------------- | ------------- | --------------------------------------------------------------------------------------- |
| `POST /auth/register` | No            | Create account. Returns user summary.                                                   |
| `POST /auth/login`    | No            | Validate credentials. Returns `{ access_token }` + sets `refreshToken` HttpOnly cookie. |
| `POST /auth/refresh`  | Cookie        | Exchange refresh token for new access token (rotation).                                 |
| `POST /auth/logout`   | No            | Revokes session from DB. Clears `refreshToken` cookie.                                  |

Rate limit: 10 requests / 60s on `register` and `login`. `refresh` allows 100 / 60s.

### Users — `GET /api/users/*`

| Endpoint        | Auth Required | Description                                   |
| --------------- | ------------- | --------------------------------------------- |
| `GET /users/me` | JWT           | Get the current authenticated user's profile. |
