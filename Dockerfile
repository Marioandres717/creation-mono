FROM node:16-stretch

RUN mkdir /wallet
WORKDIR /wallet

COPY package.json ./
RUN npm install
