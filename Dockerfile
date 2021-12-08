FROM node:latest

RUN mkdir /wallet
WORKDIR /wallet

COPY package.json ./
RUN npm install

COPY libs/shared/models/src/prisma/schema.prisma libs/shared/models/src/prisma/
RUN npx prisma generate --schema libs/shared/models/src/prisma/schema.prisma

