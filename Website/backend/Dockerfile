# Use lightweight Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy everything
COPY . .

# Expose your server port
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
