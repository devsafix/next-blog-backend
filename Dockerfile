# ----- Stage 1: The Builder -----
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Copy Prisma schema and migrations. `npm install` runs `prisma generate`.
# `prisma migrate deploy` in entrypoint needs migrations.
COPY prisma/schema.prisma ./prisma/
COPY prisma/migrations ./prisma/migrations

# Install all dependencies (including devDependencies for building)
RUN npm install

# Copy *only* source files required for building.
# Avoids copying node_modules, dist, .git, etc. from host if .dockerignore isn't perfect.
COPY src ./src
COPY tsconfig.json .
# If you have other config files needed for build, add them here.

# Run the TypeScript build
RUN npm run build


# ----- Stage 2: The Production Image -----
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy package.json and package-lock.json (needed for 'npm install --omit=dev')
COPY package*.json ./

# Copy Prisma schema and migrations (needed for `prisma migrate deploy` in entrypoint)
COPY prisma/schema.prisma ./prisma/
COPY prisma/migrations ./prisma/migrations

# Install ONLY production dependencies
# This runs `prisma generate` again, creating the client specific to this environment.
RUN npm install --omit=dev

# Copy the built application from the 'builder' stage
COPY --from=builder /app/dist ./dist

# Copy the Docker entrypoint script
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

# Expose the application port
EXPOSE 5000

# Start the application using the entrypoint script
ENTRYPOINT ["./docker-entrypoint.sh"]