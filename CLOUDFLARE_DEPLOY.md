# Cloudflare Workers Deployment

This project is configured for Cloudflare Workers through OpenNext.

## Cloudflare Build Settings

- Runtime: Node.js 20
- Install command: `npm ci`
- Build command: `npm run cf:build`
- Deploy command for CLI deploys: `npm run cf:deploy`

If Cloudflare asks for environment variables, add:

- `NODE_VERSION=20`
- `DATABASE_URL`
- `ADMIN_USER`
- `ADMIN_PASS`
- `ADMIN_SESSION_SECRET`

Do not upload `.env` to GitHub or Cloudflare.

## First-Time CLI Setup

```bash
npm ci
npx wrangler login
npx wrangler r2 bucket create hltpack-opennext-cache
npm run cf:deploy
```

## Important Production Blockers

The current local app still uses SQLite:

```env
DATABASE_URL="file:./dev.db"
```

Cloudflare Workers cannot persist a local SQLite file. Before production use,
move the database to Cloudflare D1 or an external database such as Postgres.

The current app also has server-side local file writes in `src/lib/upload.ts`
and `.env` writes in `src/actions/adminAuthActions.ts`. These need to be moved
to Cloudflare R2 and Cloudflare environment variables before the admin upload
and password-change flows can work reliably on Workers.

SMTP through `nodemailer` may also need replacement with an HTTP email API
provider because Workers do not support normal long-lived SMTP sockets.
