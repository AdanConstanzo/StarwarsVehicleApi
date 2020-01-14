FROM node:12.6
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

EXPOSE 8081
CMD [ "npm", "start" ]