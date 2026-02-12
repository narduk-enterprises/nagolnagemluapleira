# Nuxt 4 Template

A production-ready starter template for Nuxt 4, Nuxt UI v4, Tailwind CSS 4, and TypeScript — deployed on Cloudflare Pages with D1.

## What's included

- **Nuxt 4** — The latest evolution of the Nuxt framework.
- **Nuxt UI v4** — High-quality components for beautiful interfaces.
- **Tailwind CSS 4** — Next generation utility-first CSS.
- **TypeScript** — Full type safety out of the box.
- **Cloudflare D1** — Queryable SQLite database on the edge.
- **Authentication** — Email/password (PBKDF2) + Sign in with Apple, with a global `useAuth()` composable and route middleware.
- **Security** — CSRF protection and rate limiting on auth endpoints.
- **PostHog & GA4** — Privacy-first analytics with manual SPA pageview tracking.
- **SEO** — Default meta tags, sitemap, robots.txt, and automated GSC submission.
- **Error Handling** — Branded global error page for 404/401/403/500.
- **Health Check** — `/api/health` endpoint for deployment verification.
- **Drizzle ORM** — Schema-first database with migration scaffold.

## Quick Start

1. **Use this template** to create a new repository.
2. **Clone** your new repository:
   ```bash
   git clone <your-repo-url>
   cd nuxt-v4-template
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```

### Deployment (Cloudflare Pages)

The template is pre-configured for Cloudflare Pages with D1.

1. Create a D1 database: `npx wrangler d1 create <db-name>`
2. Update `wrangler.json` with your `database_id`.
3. Apply migrations: `npx wrangler d1 migrations apply <db-name> --local` (or `--remote` for production).
4. Deploy: `npm run deploy`

### Database Migrations

Migrations live in the `drizzle/` directory. The template ships with `0000_initial_schema.sql`.

```bash
# Generate a new migration from schema changes:
npx drizzle-kit generate

# Apply locally:
npx wrangler d1 migrations apply <db-name> --local

# Apply to production:
npx wrangler d1 migrations apply <db-name> --remote
```

### Authentication

Includes email/password hashing (Web Crypto PBKDF2) and Apple Sign-In.

- **`useAuth()` composable** — Global reactive auth state (`user`, `loggedIn`), plus `login()`, `signup()`, `logout()`, and `refresh()` methods.
- **Route middleware** — Protect pages with `definePageMeta({ middleware: 'auth' })`.
- **Apple Sign-In** — Requires Apple Developer account. Set `APPLE_TEAM_ID`, `APPLE_CLIENT_ID`, `APPLE_KEY_ID`, and `APPLE_SECRET_KEY`.

### Security

- **CSRF Protection** — State-changing requests (POST/PUT/DELETE) require the `X-Requested-With: XMLHttpRequest` header. Nuxt's `$fetch` sends this automatically.
- **Rate Limiting** — Login (10/min) and signup (5/min) per IP. In-memory sliding window, per-isolate on Cloudflare Workers.

### Analytics (PostHog)

1. Set `POSTHOG_PUBLIC_KEY` and `POSTHOG_HOST` via Doppler or `.env`.
2. Manual pageviews are automatically captured via the `posthog.client.ts` plugin.

### SEO & Google Search Console

- **Default SEO** — Title template, OG tags, and Twitter card configured in `app.vue`. Override per-page with `useSeoMeta()`.
- **Sitemap** — Automatically generated at `/sitemap.xml` via `@nuxtjs/sitemap`.
- **GSC Management**:
  ```bash
  npm run gsc:init     # Register site + generate verification file
  npm run gsc:verify   # Confirm ownership after deploying verification file
  npm run sitemap:submit  # Notify Google of your sitemap
  ```
  Requires `SITE_URL` and `GSC_SERVICE_ACCOUNT_JSON`.

### Health Check

`GET /api/health` returns app status, version, build timestamp, and D1 connectivity. Useful for monitoring and post-deploy verification.

## Customization

### Colors

Primary and neutral colors can be configured in `app/app.config.ts`. By default, it uses `green` as primary and `slate` as neutral.

### Fonts

Global styles and custom font imports are located in `app/assets/css/main.css`. The template includes `@nuxt/fonts` for easy font management.
