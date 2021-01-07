FROM node:latest

RUN mkdir -p /var/www

WORKDIR /var/www

COPY package*.json /var/www

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "NPM", "START" ]

