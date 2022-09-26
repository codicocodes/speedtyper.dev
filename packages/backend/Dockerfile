FROM node:16

RUN apk update
RUN apk add --no-cache python3 make g++

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY yarn.lock /app
RUN yarn

# Bundle app source
COPY . /app
RUN yarn build

EXPOSE 80

CMD [ "yarn", "start" ]
