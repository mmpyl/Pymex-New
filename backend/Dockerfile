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

# Instalar TODAS las dependencias (incluye devDependencies como typescript y ts-node)
RUN npm ci

COPY . .

# Compila TypeScript a JavaScript
RUN npm run build

# Eliminar dependencias de desarrollo después del build
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start"]

