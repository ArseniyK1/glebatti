FROM node:20-alpine AS deps
WORKDIR /app
COPY back/package*.json ./
RUN npm i

FROM node:20-alpine AS builder
WORKDIR /app
COPY back/ ./
RUN npm i \
  && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY back/package*.json ./

# Expose Nest static uploads dir mountpoint
RUN mkdir -p /app/uploads

CMD ["node", "dist/src/main.js"]


