FROM node:20-alpine as development

WORKDIR /app

COPY package*.json ./

# Instalar devDependencies (incluye ts-node)
RUN npm install
# Verificación (no falla el build)
RUN npx --yes ts-node -v || true


COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:20-alpine as production

WORKDIR /app

COPY package*.json ./

# Producción: instalar solo dependencias runtime
RUN npm ci --omit=dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]



