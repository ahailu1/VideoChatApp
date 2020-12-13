FROM node:latest

RUN mkdir -p /usr/app/src
RUN mkdir -p /usr/app/src/VideoApi

WORKDIR /app/src/VideoApi

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

