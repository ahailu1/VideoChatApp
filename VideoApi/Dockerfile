FROM node:latest

RUN mkdir -p /var/www/api

WORKDIR /var/www/api

COPY package*.json /var/www/api

RUN npm install

COPY . .

CMD ["npm", "start"]

