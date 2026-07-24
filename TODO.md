# Deploy Plan - Pymex

## Steps

### ✅ Step 1: Fix backend/Dockerfile production stage
- **Problem**: `npm ci --omit=dev` does NOT install TypeScript/ts-node (devDependencies), so `npm run build` (tsc) fails
- **Fix**: Install ALL deps for build, compile, then prune to production deps
- **Status**: ✅ Done

### ✅ Step 2: Create `docker-compose.prod.yml`
- Backend service: `target: production`, no source code volume mounts, port 3000
- Frontend service: `target: production` (nginx serving built static files), port 80, no source mounts
- ML Service: production environment, no source mounts
- Facturación Service: production environment, no source mounts
- PostgreSQL + Redis: same as dev (persistent volumes)
- Remove development-specific configs (volumes mounting source code, dev ports, etc.)
- **Status**: ✅ Done

### ✅ Step 3: Fix frontend nginx.conf to proxy /api-docs and /health
- **Status**: ✅ Done

### ✅ Step 4: Create .env.production template
- **Status**: ✅ Done

### ✅ Step 5: Build and deploy
```bash
docker compose -f docker-compose.prod.yml down -v
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml logs -f
```
- **Status**: ✅ Done - All 6 services running and verified

