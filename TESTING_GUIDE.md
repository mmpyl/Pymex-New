# Tests de Usuario End-to-End para Pymex SAAS

Este documento describe cómo ejecutar pruebas end-to-end (E2E) en el entorno Docker Desktop.

## Prerrequisitos

1. **Docker Desktop** instalado y ejecutándose
2. **Node.js 20+** (para pruebas locales del frontend)
3. **Postman** o **curl** (para pruebas de API)
4. **Navegador web** (Chrome/Firefox recomendado)

## Quick Start - Despliegue Rápido

### 1. Clonar y Configurar

```bash
cd /workspace
cp .env.example .env
```

### 2. Iniciar Todos los Servicios

```bash
docker-compose up -d --build
```

### 3. Verificar Estado de los Contenedores

```bash
docker-compose ps
```

Todos los servicios deben estar en estado `healthy` o `running`.

### 4. Ver Logs en Tiempo Real

```bash
docker-compose logs -f
```

## Servicios Desplegados

| Servicio | Puerto | URL | Descripción |
|----------|--------|-----|-------------|
| Frontend | 5173 | http://localhost:5173 | Aplicación React |
| Backend | 3000 | http://localhost:3000 | API Node.js |
| ML Service | 8000 | http://localhost:8000 | API Python FastAPI |
| Facturación | 8001 | http://localhost:8001 | API PHP |
| PostgreSQL | 5432 | localhost:5432 | Base de datos |
| Redis | 6379 | localhost:6379 | Cache |

## Guía de Pruebas End-to-End

### Fase 1: Health Checks (2 minutos)

Verificar que todos los servicios estén respondiendo:

```bash
# Backend
curl http://localhost:3000/health

# Frontend
curl http://localhost:5173

# ML Service
curl http://localhost:8000/health

# Facturación Service
curl http://localhost:8001/health

# Database (desde el contenedor)
docker exec pymex-postgres pg_isready -U pymex

# Redis
docker exec pymex-redis redis-cli ping
```

**Resultado esperado:** Todos deben responder con estado OK o similar.

### Fase 2: Pruebas de API del Backend (5 minutos)

#### 2.1 Swagger Documentation
Abrir en navegador: http://localhost:3000/api-docs

#### 2.2 Endpoints Principales

```bash
# Registro de usuario admin (si está disponible)
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@pymex.com",
    "password": "Test123!",
    "nombre": "Usuario Test"
  }'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@pymex.com",
    "password": "admin123"
  }'

# Obtener empresas (requiere autenticación)
curl http://localhost:3000/api/v1/admin/empresas \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Fase 3: Pruebas del Frontend (10 minutos)

#### 3.1 Acceso a la Aplicación
1. Abrir navegador: http://localhost:5173
2. Verificar que la página cargue sin errores
3. Abrir DevTools (F12) y verificar consola sin errores críticos

#### 3.2 Flujo de Usuario Completo

**Escenario 1: Registro de Nueva Empresa**
1. Navegar a `/registro` o `/signup`
2. Completar formulario de registro de empresa
3. Verificar creación exitosa
4. Verificar email de confirmación (si aplica)

**Escenario 2: Login y Dashboard**
1. Navegar a `/login`
2. Ingresar credenciales
3. Verificar redirección al dashboard
4. Verificar carga de datos iniciales

**Escenario 3: Gestión de Productos**
1. Navegar a `/productos`
2. Crear nuevo producto
3. Editar producto existente
4. Eliminar producto
5. Verificar persistencia de datos

**Escenario 4: Reportes y Análisis**
1. Navegar a `/reportes`
2. Generar reporte de ventas
3. Exportar a PDF/Excel
4. Verificar integración con ML Service

### Fase 4: Pruebas del ML Service (5 minutos)

```bash
# Health check
curl http://localhost:8000/health

# Predicción de ventas (ejemplo)
curl -X POST http://localhost:8000/api/v1/predict/ventas \
  -H "Content-Type: application/json" \
  -d '{
    "empresa_id": 1,
    "periodo": "2024-01",
    "datos_historicos": [...]
  }'

# Análisis de recomendaciones
curl http://localhost:8000/api/v1/recommendations/1
```

### Fase 5: Pruebas del Facturación Service (5 minutos)

```bash
# Health check
curl http://localhost:8001/health

# Información del servicio
curl http://localhost:8001/

# Generar factura electrónica (ejemplo)
curl -X POST http://localhost:8001/api/facturas \
  -H "Content-Type: application/json" \
  -d '{
    "ruc": "20123456789",
    "cliente": "12345678901",
    "items": [...]
  }'
```

### Fase 6: Pruebas de Integración (10 minutos)

#### 6.1 Flujo Completo de Venta

1. **Crear Producto** (Frontend → Backend → DB)
2. **Registrar Venta** (Frontend → Backend → DB)
3. **Generar Predicción** (Backend → ML Service)
4. **Emitir Factura** (Backend → Facturación Service → SUNAT)
5. **Verificar en Dashboard** (Frontend ← Backend ← DB)

#### 6.2 Verificación de Datos

```bash
# Conectar a PostgreSQL
docker exec -it pymex-postgres psql -U pymex -d pymex_db

# Consultas de verificación
SELECT COUNT(*) FROM empresas;
SELECT COUNT(*) FROM usuarios_business;
SELECT COUNT(*) FROM productos;
SELECT COUNT(*) FROM ventas;

# Salir
\q
```

## Checklist de Pruebas

### Infraestructura
- [ ] Todos los contenedores están running
- [ ] Health checks pasan correctamente
- [ ] Logs sin errores críticos
- [ ] Volúmenes de datos creados

### Backend
- [ ] API responde en /health
- [ ] Swagger documentation accesible
- [ ] Autenticación funciona
- [ ] CRUD de entidades básico funciona
- [ ] Conexión a PostgreSQL correcta
- [ ] Conexión a Redis correcta

### Frontend
- [ ] Página principal carga
- [ ] No hay errores en consola
- [ ] Login funcional
- [ ] Navegación entre páginas funciona
- [ ] Formularios validan correctamente
- [ ] Datos se muestran correctamente

### ML Service
- [ ] API responde en /health
- [ ] Endpoints de predicción funcionan
- [ ] Conexión a base de datos correcta

### Facturación Service
- [ ] API responde en /health
- [ ] Generación de XML funciona
- [ ] Comunicación con SUNAT (sandbox)

### Integración
- [ ] Frontend ↔ Backend comunicación
- [ ] Backend ↔ ML Service comunicación
- [ ] Backend ↔ Facturación comunicación
- [ ] Datos persistentes correctamente

## Comandos Útiles

### Ver Logs Específicos
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs ml-service
docker-compose logs facturacion-service
docker-compose logs postgres
```

### Reiniciar Servicios
```bash
# Servicio específico
docker-compose restart backend

# Todos los servicios
docker-compose restart
```

### Detener y Limpiar
```bash
# Detener sin eliminar datos
docker-compose down

# Detener y eliminar volúmenes (¡CUIDADO! Pierde datos)
docker-compose down -v

# Detener, eliminar volúmenes e imágenes
docker-compose down -v --rmi all
```

### Acceder a Contenedores
```bash
# Backend
docker exec -it pymex-backend sh

# Frontend
docker exec -it pymex-frontend sh

# ML Service
docker exec -it pymex-ml-service bash

# PostgreSQL
docker exec -it pymex-postgres psql -U pymex -d pymex_db

# Redis CLI
docker exec -it pymex-redis redis-cli
```

## Solución de Problemas Comunes

### Error: Puertos ya en uso
```bash
# Ver qué usa los puertos
netstat -tulpn | grep -E '3000|5173|8000|8001'

# Matar procesos o cambiar puertos en docker-compose.yml
```

### Error: Base de datos no inicializada
```bash
# Ver logs de postgres
docker-compose logs postgres

# Forzar re-inicialización
docker-compose down -v
docker-compose up -d postgres
docker-compose up -d
```

### Error: Frontend no conecta al backend
- Verificar VITE_API_URL en .env
- Verificar CORS en backend
- Revisar logs del frontend

### Error: ML Service no responde
```bash
# Verificar requirements instalados
docker exec pymex-ml-service pip list

# Rebuild del servicio
docker-compose up -d --build ml-service
```

## Métricas de Rendimiento

Durante las pruebas, monitorear:

1. **Tiempo de respuesta API**: < 500ms para operaciones básicas
2. **Tiempo de carga frontend**: < 3 segundos
3. **Uso de memoria**: Verificar con `docker stats`
4. **Errores en logs**: Cero errores críticos

```bash
# Ver estadísticas en tiempo real
docker stats
```

## Próximos Pasos

Después de completar las pruebas E2E:

1. Documentar bugs encontrados
2. Priorizar fixes
3. Planear pruebas de carga
4. Preparar entorno de staging
5. Definir pipeline CI/CD

## Contacto y Soporte

Para issues relacionados con las pruebas:
- Revisar logs completos
- Documentar pasos para reproducir
- Incluir versión de Docker Desktop
- Adjuntar screenshots si aplica

---

**Nota:** Este entorno es para desarrollo y pruebas. Para producción, configurar variables de entorno seguras, usar HTTPS, y seguir mejores prácticas de seguridad.
