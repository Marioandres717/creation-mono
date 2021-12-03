FROM node:16-stretch

RUN mkdir /wallet
WORKDIR /wallet

COPY package.json package-lock.json ./
RUN npm ci
