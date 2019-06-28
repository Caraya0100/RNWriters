FROM node:latest

WORKDIR /opt/app

# install android tools (adb)
#RUN apt-get update && \
#    apt-get install android-tools-adb

# install dependencies
COPY package.json yarn.lock app.json ./
RUN npm cache clean --force && npm install -g expo-cli && npm install

# copy app source to image _after_ npm install so that
# application code changes don't bust the docker cache of npm install step
COPY . /opt/app

ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.0.10"
EXPOSE 19000
EXPOSE 19001

CMD [ "npm", "run", "start" ]