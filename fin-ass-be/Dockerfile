FROM node:20-alpine AS base

# First stage: dependencies stage
FROM base AS dependencies

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Second stage: build stage
FROM base AS build

WORKDIR /app

# Copy the rest of the application code to the container
COPY . .

# Build TypeScript code
RUN npm run build

# Third stage: production stage
FROM base AS production

# Set the working directory in the container
WORKDIR /app

# Copy production dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy build artifacts from build stage
COPY --from=build /app/build ./build

# Declare env variables
# ENV PORT=4000
# ENV HOST=0.0.0.0
# ENV MONGODB_URL=mongodb://mongodb-container:27017
# ENV NODE_ENV=development

# Expose the port on which the server will run
EXPOSE 4000

# Command to run the server
CMD ["node", "build/app.js"]