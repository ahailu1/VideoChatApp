FROM node:latest

RUN mkdir -p /usr/app/src/
RUN mkdir -p /usr/app/src/videoUI

WORKDIR /app/src/videoUI

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "NPM", "START" ]

