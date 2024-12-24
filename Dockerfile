# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Expose port 3000 to the outside world (adjust if your app listens on a different port)
EXPOSE 3000

# Define the command to run your Node.js application
CMD [ "npm", "run", "dev" ]
