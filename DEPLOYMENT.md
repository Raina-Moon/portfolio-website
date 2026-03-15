# Deployment

## Frontend: Cloudflare

The Astro frontend is deployed with GitHub Actions through Wrangler.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `PUBLIC_SITE_URL`
- `PUBLIC_API_URL`
- `PUBLIC_TROUBLESHOOTING_PASSWORD`

If Cloudflare reports an invalid `SESSION` binding during deploy or runtime, create a KV namespace and add a `SESSION` binding in `frontend-astro/wrangler.jsonc`.

Workflow:

- `.github/workflows/deploy-frontend-cloudflare.yml`

Build command used in CI:

```bash
npm install --prefix frontend-astro
npm run build:cloudflare --prefix frontend-astro
npx wrangler deploy --cwd frontend-astro
```

## Backend: Oracle VM

The backend workflow expects an Oracle VM with this repo already cloned.

Required GitHub repository secrets:

- `ORACLE_HOST`
- `ORACLE_PORT`
- `ORACLE_USER`
- `ORACLE_SSH_KEY`
- `ORACLE_APP_DIR`

Recommended server setup:

1. Install Node 20+, npm, PostgreSQL, and PM2.
2. Clone this repository on the server.
3. Create `backend/.env` on the server.
4. Run backend through PM2 using `backend/ecosystem.config.cjs`.

Workflow:

- `.github/workflows/deploy-backend-oracle.yml`

The workflow does:

```bash
git pull --ff-only origin main
npm install --prefix backend
npx prisma generate --schema backend/prisma/schema.prisma
npx prisma migrate deploy --schema backend/prisma/schema.prisma
npm run build --prefix backend
./backend/node_modules/.bin/pm2 startOrReload backend/ecosystem.config.cjs --update-env
```
