# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:24.11

# Set the working directory inside the container
WORKDIR /usr/src/app

ARG DATABASE_URL

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY yarn.lock package*.json ./

# Install dependencies.
RUN yarn install

# Copy local code to the container image.
COPY . .

# Generate Prisma Client
RUN yarn prisma generate

# Build the NestJS application
RUN yarn run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]