FROM node:10-alpine

WORKDIR /opt/app

COPY package.json yarn.lock app.json ./

RUN apk add --no-cache bash

RUN npm install -g expo-cli && npm install