import { Sequelize } from 'sequelize';
import { env } from '../../../config/env';

export const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: 'postgres',
    logging: env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ alter: env.NODE_ENV === 'development' });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
    throw error;
  }
};
