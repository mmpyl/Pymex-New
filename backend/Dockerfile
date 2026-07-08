FROM node:20-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:20-alpine as production

WORKDIR /app

COPY package*.json ./

# Instala dependencias de producción (sin devDependencies)
RUN npm ci --omit=dev

COPY . .

# Compila TypeScript a dist
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

