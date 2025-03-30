# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire project
COPY . .

# Expose the port your app runs on (default is 3000 for React)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
