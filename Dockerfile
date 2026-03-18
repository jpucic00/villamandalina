# ---- Build stage ----
FROM node:20-slim AS builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# ---- Runtime stage ----
FROM node:20-slim AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

WORKDIR /app

# Standalone output includes server.js + minimal node_modules
COPY --from=builder /app/frontend/.next/standalone ./
# Static assets (not included in standalone automatically)
COPY --from=builder /app/frontend/.next/static ./frontend/.next/static
COPY --from=builder /app/frontend/public ./frontend/public
# DB init script (deps like @libsql/client and bcryptjs are in standalone node_modules)
COPY --from=builder /app/frontend/scripts ./frontend/scripts

EXPOSE 3000

CMD ["sh", "-c", "node frontend/scripts/init-db.mjs && node frontend/server.js"]
