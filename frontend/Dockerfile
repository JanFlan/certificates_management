# use multi-stage build for optimized size
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

# second stage: create a clean runtime image
FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
