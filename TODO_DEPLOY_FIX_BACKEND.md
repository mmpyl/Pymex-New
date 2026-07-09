# Pymex-New despliegue: fix `ts-node: not found`

## Estado
El contenedor `backend` no levanta porque falla con: `sh: ts-node: not found`.

## Causa más probable
En el contenedor se ejecuta `npm run dev` (`ts-node ...`) pero `ts-node` no queda disponible en el entorno de ejecución. Esto suele ocurrir si:
- `npm install` realmente no se ejecuta en el stage usado, o
- se pisa `node_modules` con un volumen/overlay, o
- el stage no es el que se usa al levantar el contenedor.

## Objetivo
Hacer que `backend` arranque aunque falte `ts-node` instalando `ts-node` explícitamente y/o evitando depender del binario global.

## Pasos
1. Editar `Pymex-New/backend/docker/Dockerfile`:
   - En stage `development`, ejecutar `npm install` y luego forzar `npx ts-node -v` (como verificación opcional).
   - Alternativa robusta: ejecutar `npm install --include=dev` (si el npm del contenedor lo soporta) o instalar `ts-node` explícitamente.
2. Reconstruir el contenedor:
   - `docker compose down`
   - `docker compose up -d --build backend`
3. Verificar logs:
   - `docker compose logs -f --tail=100 backend`
4. Verificar desde nginx:
   - `http://localhost/api-docs`
   - `http://localhost/`

