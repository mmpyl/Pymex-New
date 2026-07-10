"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDatabase = exports.connectDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const env_1 = require("../../../config/env");
exports.sequelize = new sequelize_1.Sequelize(env_1.env.DB_NAME, env_1.env.DB_USER, env_1.env.DB_PASSWORD, {
    host: env_1.env.DB_HOST,
    port: env_1.env.DB_PORT,
    dialect: 'postgres',
    logging: env_1.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
const connectDatabase = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('Database connection established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
const syncDatabase = async () => {
    try {
        // En este proyecto el esquema base viene de `database/schema.sql` (o migraciones).
        // `sequelize.sync()` puede fallar si un modelo tiene FKs hacia tablas no modeladas.
        // Evitamos alterar el schema automáticamente.
        // Aun con `alter: false`, Sequelize intenta crear tablas faltantes.
        // Como el schema real se gestiona vía `database/schema.sql`, evitamos `sync`.
        // `sync()` solo debería usarse en tests o para prototipos.
        await Promise.resolve();
        console.log('Database synchronized successfully.');
    }
    catch (error) {
        console.error('Unable to synchronize the database:', error);
        throw error;
    }
};
exports.syncDatabase = syncDatabase;
//# sourceMappingURL=sequelize-instance.js.map