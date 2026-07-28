import { createApp } from './app';
import { connectDatabase, syncDatabase } from '../infrastructure/database/config/sequelize-instance';
import { env } from '../config/env';

const startServer = async (): Promise<void> => {
  try {
    // Connect to database (skip if AUTH_BYPASS is enabled for development)
    const shouldConnectDB = process.env.AUTH_BYPASS !== 'true' || env.NODE_ENV !== 'development';
    
    if (shouldConnectDB) {
      await connectDatabase();
      await syncDatabase();
    } else {
      console.log('Database connection skipped (AUTH_BYPASS enabled)');
    }

    // Create and start app
    const app = createApp();
    
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
      console.log(`Environment: ${env.NODE_ENV}`);
      console.log(`Swagger docs: http://localhost:${env.PORT}/api-docs`);
      if (process.env.AUTH_BYPASS === 'true') {
        console.log('⚠️  AUTH_BYPASS enabled - Authentication is disabled for development');
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
