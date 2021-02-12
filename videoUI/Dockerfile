FROM node:latest

RUN mkdir -p /var/www/frontend/

WORKDIR /var/www/frontend/

COPY . /var/www/frontend/

COPY package*.json /var/www/frontend/

RUN npm install

EXPOSE 3000

CMD [ "npm", "start"]


