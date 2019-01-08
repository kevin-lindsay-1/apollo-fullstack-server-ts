# Arguments/varibles to be used later
ARG port=4000

# -----
# BUILD
# -----

# Pull node LTS image
FROM node:lts AS build

# Set the working directory
WORKDIR /usr/src/app

# Get package information
COPY package*.json ./

# Install all dependencies
RUN npm i

# Get rest of files
COPY . ./

# Run tests
RUN npm run test

# If tests pass, build
RUN npm run build

# ------
# DEPLOY
# ------

# If build succeeds, grab the output files
# Reset the container
FROM node:lts

# Set the working directory
WORKDIR /usr/src/app

# Fetch the package info
COPY --from=build package*.json ./

# Install only prod dependencies
RUN npm i --only-production

# Get sources
COPY --from=build build ./

EXPOSE $port

CMD [ "npm", "start" ]
