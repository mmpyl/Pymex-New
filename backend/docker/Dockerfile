FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Modo desarrollo: ts-node sin compilar
CMD ["npm", "run", "dev"]

