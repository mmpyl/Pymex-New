import { createApp } from './app';
import { connectDatabase, syncDatabase } from '../infrastructure/database/config/sequelize-instance';
import { env } from '../config/env';

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();
    await syncDatabase();

    // Create and start app
    const app = createApp();
    
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
      console.log(`Environment: ${env.NODE_ENV}`);
      console.log(`Swagger docs: http://localhost:${env.PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
