FROM node:16.19

WORKDIR /app

COPY . .
     
RUN npm install

RUN npm run generate-types

RUN npm run sync-db-tables

RUN npm run sync-db-tables-test

RUN npm run build

CMD ["npm", "run", "dev"]