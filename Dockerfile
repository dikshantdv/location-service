FROM node:16-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node","app.js"]
