FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install root and frontend dependencies
RUN npm install
RUN cd frontend && npm install

# Copy source code
COPY . .

# Build Next.js app
RUN cd frontend && npm run build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Initialize DB and start Next.js
CMD ["sh", "-c", "cd frontend && node scripts/init-db.mjs && npm start"]
