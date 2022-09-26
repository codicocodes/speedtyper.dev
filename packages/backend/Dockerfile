FROM node:16-alpine

RUN apk update
RUN apk add --no-cache python3 make g++

RUN apt-get update || : && apt-get install python -y

# Create app directory
RUN mkdir -p /app
WORKDIR /app


# node-gyp
RUN npm install --global node-gyp@latest
RUN npm config set node_gyp $(npm prefix -g)/lib/node_modules/node-gyp/bin/node-gyp.js

# Install app dependencies
COPY package.json /app
COPY yarn.lock /app
RUN yarn

# Bundle app source
COPY . /app
RUN yarn build

EXPOSE 80

CMD [ "yarn", "start" ]
