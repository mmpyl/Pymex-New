# TODO - Revisión de despliegue (Pymex-New)

- [ ] Crear `infraestructura/nginx/conf.d/default.conf` con server block para servir frontend y proxy de `/api/*` hacia `backend`.
- [ ] Actualizar `Pymex-New/docker-compose.yml` para alinear modo de producción:
  - [x] `frontend` usar `target: production` cuando se levante con profile `production`.
  - [ ] (Opcional) asegurar que `backend` esté en modo correcto (dev vs prod) según el objetivo.

- [x] Definir y/o ajustar el comando de ejecución para producción: `docker compose --profile production up -d --build`.

- [x] Validar con logs y endpoints esperados:
  - [x] Evidencia de proxy: `/api-docs` desde nginx devuelve 502 inicialmente por backend caído
  - [ ] Corregir backend production/dev para eliminar `ts-node: not found`



