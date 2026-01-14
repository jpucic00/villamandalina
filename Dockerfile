FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY gui/package*.json ./gui/
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN cd gui && npm install
RUN cd server && npm install

# Copy source code
COPY . .

# Build React app
RUN cd gui && npm run build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start command
CMD ["sh", "-c", "npm run init-db && npm start"]
