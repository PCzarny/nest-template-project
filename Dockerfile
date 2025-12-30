# Multi-stage build for both HTTP service and RabbitMQ consumer

# Build stage
FROM node:24.11 AS builder
WORKDIR /usr/src/app

ARG DATABASE_URL

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND yarn.lock are copied.
# Copying this separately prevents re-running yarn install on every code change.
COPY yarn.lock package*.json ./

# Install dependencies.
RUN yarn install --frozen-lockfile

# Copy local code to the container image.
COPY . .

# Generate Prisma Client
RUN yarn prisma generate

# Build both NestJS applications
RUN yarn build nest-template-project
RUN yarn build rabbit-consumer

# HTTP Service stage
FROM node:24.11 AS http-service
WORKDIR /usr/src/app

# Copy built application and dependencies
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/generated ./generated

# Expose the application port
EXPOSE 3000

# Command to run the HTTP application
# CMD ["node", "dist/apps/nest-template-project/main"] # TODO: Revert once moved migration to GH action
CMD ["yarn", "start:prod:api"]

# RabbitMQ Consumer Service stage
FROM node:24.11 AS rabbit-consumer
WORKDIR /usr/src/app

# Copy built application and dependencies
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/generated ./generated

# Expose port (optional, for health checks)
EXPOSE 3001

# Command to run the RabbitMQ consumer
CMD ["node", "dist/apps/rabbit-consumer/main"]
