import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { corsConfig } from '../config/cors';
import { errorMiddleware } from '../infrastructure/http/middleware/error.middleware';
import { authRoutes } from '../infrastructure/http/routes/auth.routes';
import { userRoutes } from '../infrastructure/http/routes/user.routes';
import { adminRoutes } from '../infrastructure/http/routes/admin.routes';
import { swaggerUi, swaggerSpec } from '../infrastructure/http/swagger/swagger.config';

export const createApp = (): Application => {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(cors(corsConfig));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // API Routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/admin', adminRoutes);
  app.use('/api/v1', userRoutes);

  // Swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });


  // Global error handler
  app.use(errorMiddleware);

  return app;
};
