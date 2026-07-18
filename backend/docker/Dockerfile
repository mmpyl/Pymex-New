FROM node:20-alpine as development

WORKDIR /app

COPY package*.json ./

# Instalar todas las dependencias (incluye devDependencies como ts-node)
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:20-alpine as production

WORKDIR /app

COPY package*.json ./

# Producción: instalar solo dependencias runtime
RUN npm ci --omit=dev

COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Eliminar dependencias de desarrollo después del build (si quedaron)
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start"]



