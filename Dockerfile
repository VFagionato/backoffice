FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./prisma /usr/src/app/prisma

RUN npx prisma generate

RUN npx prisma migrate

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]