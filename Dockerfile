# ---- Build stage ----
FROM node:20-slim AS builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# ---- Runtime stage ----
FROM node:20-slim AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

WORKDIR /app

# Standalone output includes server.js + minimal node_modules
COPY --from=builder /app/frontend/.next/standalone ./
# Static assets must be co-located with server.js
COPY --from=builder /app/frontend/.next/static ./.next/static
COPY --from=builder /app/frontend/public ./public
# DB init script + its dependencies (not included in standalone output)
COPY --from=builder /app/frontend/scripts ./frontend/scripts
COPY --from=builder /app/frontend/node_modules/bcryptjs ./node_modules/bcryptjs
COPY --from=builder /app/frontend/node_modules/@libsql ./node_modules/@libsql
COPY --from=builder /app/frontend/node_modules/libsql ./node_modules/libsql

EXPOSE 3000

CMD ["sh", "-c", "node frontend/scripts/init-db.mjs && node server.js"]
