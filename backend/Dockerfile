# Use the official Node.js image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies (ignoring bcrypt initially)
RUN yarn install --ignore-scripts

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt for the target architecture
RUN yarn add bcrypt

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
