# -----
# BUILD
# -----

# Pull node LTS image
FROM node:lts AS build
# Environment variables
ENV CI=true

# Set the working directory
WORKDIR /usr/src/app

# Get dependency info
COPY package*.json ./

# Install dependencies
RUN npm ci

# Get the rest
COPY ./ ./

# If tests pass, build
RUN npm run build

# ------
# DEPLOY
# ------

# Reset the container
FROM node:lts
# Environment variables
ENV NODE_ENV=production
ENV PORT=9999

# Set the working directory
WORKDIR /usr/src/app

# TODO: use a non-static DB
# Get the test DB from previous build
COPY --from=build /usr/src/app/store.sqlite ./

# Get dependency info from previous build
COPY --from=build /usr/src/app/package*.json ./

# Install prod deps
RUN npm ci

# Get sources from previous build
COPY --from=build /usr/src/app/build/ ./build/

# Start the server when the container initializes
CMD ["npm", "run", "start:prod"]
