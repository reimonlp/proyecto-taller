FROM node:lts

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

RUN rm -rf frontend

EXPOSE 3000

CMD ["node", "backend/server.js"]

