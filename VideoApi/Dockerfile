FROM node:latest

RUN mkdir -p /var/www

WORKDIR /var/www/

COPY package*.json ./var/www/

RUN npm install



COPY . .

EXPOSE 5000 5432

CMD ["npm", "start"]

