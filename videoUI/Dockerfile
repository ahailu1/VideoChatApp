FROM node:latest

RUN mkdir /var/www

WORKDIR /var/www/

COPY . /var/www/

COPY package*.json /var/www/

RUN npm install

EXPOSE 3000

CMD [ "npm", "start"]


