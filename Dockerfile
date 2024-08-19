# Use an official Node runtime as a parent image
FROM node:20.16.0-alpine

# Set the working directory to /
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install the dependencies
RUN npm install

# Copy the remaining application files to the working directory
COPY . .

RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start" ]