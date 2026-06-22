# Pymex - Arquitectura DDD

## Descripción del Proyecto
Sistema empresarial modular basado en Domain-Driven Design (DDD) con microservicios especializados.

## Estructura del Proyecto

```
/workspace
├── frontend/                 # React 18.3.1 + Vite 5.4.11
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Páginas de la aplicación
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # Servicios API (TanStack Query)
│   │   ├── store/           # Estado global (Zustand)
│   │   ├── lib/             # Utilidades y configuraciones
│   │   ├── types/           # Tipos TypeScript
│   │   ├── utils/           # Funciones utilitarias
│   │   └── assets/          # Recursos estáticos
│   ├── tests/               # Pruebas (Vitest + Testing Library)
│   └── docker/              # Configuración Docker
│
├── backend/                  # Node.js + Express.js 4
│   └── src/
│       ├── domain/          # Capa de dominio (reglas de negocio)
│       │   ├── entities/    # Entidades del dominio
│       │   ├── value-objects/ # Objetos de valor
│       │   ├── repositories/ # Interfaces de repositorios
│       │   ├── services/    # Servicios de dominio
│       │   └── events/      # Eventos de dominio
│       ├── application/     # Capa de aplicación
│       │   ├── use-cases/   # Casos de uso
│       │   ├── dto/         # Data Transfer Objects
│       │   ├── interfaces/  # Interfaces de aplicación
│       │   └── mappers/     # Mapeadores
│       ├── infrastructure/  # Capa de infraestructura
│       │   ├── database/    # Configuración DB (Sequelize + PostgreSQL)
│       │   ├── repositories/ # Implementación de repositorios
│       │   ├── config/      # Configuraciones
│       │   ├── middleware/  # Middlewares
│       │   └── logging/     # Logging (Winston)
│       ├── presentation/    # Capa de presentación
│       │   ├── controllers/ # Controladores
│       │   ├── routes/      # Rutas API
│       │   ├── middlewares/ # Middlewares HTTP
│       │   └── validators/  # Validadores
│       └── tests/           # Pruebas (Jest)
│
├── ml-service/              # Python + FastAPI 0.111
│   └── src/
│       ├── domain/          # Dominio ML
│       ├── application/     # Lógica de aplicación
│       ├── infrastructure/  # Infraestructura (DB, APIs externas)
│       └── presentation/    # Endpoints FastAPI
│
├── facturacion-service/     # PHP 8.2 + Slim Framework
│   └── src/
│       ├── domain/          # Dominio facturación
│       ├── application/     # Casos de uso
│       ├── infrastructure/  # Infraestructura (Greenter, SUNAT)
│       └── presentation/    # Controladores y rutas
│
├── infraestructura/         # Docker + Nginx
│   ├── docker-configs/      # Configuraciones Docker
│   ├── nginx/               # Configuración Nginx
│   └── k8s/                 # Kubernetes manifests
│
└── database/                # Scripts de base de datos
```

## Tecnologías

### Frontend
- **React** 18.3.1 con **Vite** 5.4.11
- **Tailwind CSS** 3.4.17 + **Headless UI** + **Lucide React** (iconos)
- **TanStack React Query** (data fetching) + **Zustand** (state management)
- **React Router DOM** 6 + **React Hook Form** + **Zod** (validación)
- **Recharts** (visualización de datos) + **Sonner** (notificaciones)
- **Vitest** + **Testing Library** (testing)

### Backend (Node.js)
- **Express.js** 4
- **Sequelize** 6 (ORM) + **PostgreSQL** 16
- **Redis** 7 (caché y sesiones)
- **JWT** + **bcryptjs** (autenticación)
- **Swagger** (documentación API)
- **Stripe** (pagos) + **Nodemailer** (email)
- **PDFKit** + **ExcelJS** (reportes)
- **Winston** (logging) + **Jest** (testing)

### ML Service (Python)
- **FastAPI** 0.111 + **Uvicorn**
- **Scikit-learn** 1.5 + **XGBoost** 2.0
- **Pandas** + **NumPy** + **SQLAlchemy**
- **Pydantic** (validación)

### Facturación Service (PHP)
- **PHP** 8.2 + **Slim Framework**
- **Apache** + **Composer**
- **Greenter** (facturación SUNAT Perú)

### Infraestructura
- **Docker** + **Docker Compose**
- **PostgreSQL** 16 Alpine + **Redis** 7 Alpine
- **Nginx** (producción frontend)
- Red personalizada Docker

## Patrones DDD Implementados

### Capas
1. **Domain Layer**: Entidades, objetos de valor, eventos y servicios de dominio
2. **Application Layer**: Casos de uso, DTOs, interfaces
3. **Infrastructure Layer**: Persistencia, configuración, logging
4. **Presentation Layer**: Controladores, rutas, validadores

### Principios
- **Separation of Concerns**: Cada capa tiene responsabilidad única
- **Dependency Inversion**: Las capas internas no dependen de las externas
- **Rich Domain Models**: Entidades con lógica de negocio
- **Value Objects**: Objetos inmutables definidos por sus atributos
- **Repository Pattern**: Abstracción de persistencia
- **CQRS**: Separación de comandos y consultas (opcional)

## Comandos Útiles

### Docker
```bash
# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

### Desarrollo
```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && npm install && npm run dev

# ML Service
cd ml-service && pip install -r requirements.txt && uvicorn src.main:app --reload

# Facturación Service
cd facturacion-service && composer install && php -S localhost:8000 -t public
```

## Documentación API
- Swagger UI: `http://localhost:3000/api-docs` (backend)
- FastAPI Docs: `http://localhost:8000/docs` (ml-service)

## Notas
- Cada servicio es independiente y puede desplegarse por separado
- La comunicación entre servicios se realiza vía API REST
- PostgreSQL y Redis son compartidos entre servicios
- La red Docker personalizada asegura aislamiento y seguridad
