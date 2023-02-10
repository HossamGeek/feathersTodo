# Use a Node.js base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of the application's files to the container
COPY . .

# Expose port 3000
EXPOSE 3030

# Define the command to run when the container starts
CMD ["npm", "start"]