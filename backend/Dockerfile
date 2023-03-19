FROM node:16-alpine
WORKDIR /usr/src/app
RUN npm install -g @nestjs/cli
COPY package*.json ./
RUN npm install
COPY . .