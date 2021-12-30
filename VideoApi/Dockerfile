FROM node:16.13.0

RUN mkdir -p /var/www/api

WORKDIR /var/www/api

COPY package*.json /var/www/api

COPY . .

CMD ["npm", "start"]
