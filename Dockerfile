# # Use an official Node.js runtime as a parent image
# FROM node:20.11.1-alpine

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy both package.json and package-lock.json (if available)
# COPY package*.json ./

# # Install Nest CLI globally
# RUN npm install -g @nestjs/cli

# # Install npm dependencies
# RUN npm ci --omit=dev

# # Copy the TypeScript configuration file
# COPY tsconfig.json .

# # Copy the rest of your application code
# COPY . .

# # Build your Nest.js application
# RUN nest build

# # Expose the port the app runs on
# EXPOSE 3000
FROM node:20.11.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli

# Add retries to npm install to handle network issues
RUN npm install --omit=dev || npm install --omit=dev || npm install --omit=dev

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
