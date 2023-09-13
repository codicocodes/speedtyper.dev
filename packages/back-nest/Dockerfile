FROM node:20

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY yarn.lock /app
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . /app
RUN yarn build

EXPOSE 80

CMD [ "node", "dist/main.js" ]
