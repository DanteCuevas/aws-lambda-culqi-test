FROM node:16.19

WORKDIR /app

COPY . .
     
RUN npm install

RUN npm run generate-types

RUN npm run build

#CMD ["npm", "run", "dev"]

CMD ["tail", "-f", "/dev/null"]