# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY ./frontend/.env.production .env.production

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
