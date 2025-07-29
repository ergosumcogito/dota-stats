# Stage 1: Build the React app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build
COPY . .
RUN npm run build

# Stage 2: Serve the build with a static server
FROM node:18-slim

# Install 'serve' globally
RUN npm install -g serve

# Copy built files from previous stage
COPY --from=builder /app/dist /app

# Set working directory
WORKDIR /app

# Expose port
EXPOSE 3000

# Run the server
CMD ["serve", "-s", ".", "-l", "3000"]
