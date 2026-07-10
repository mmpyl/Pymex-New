"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const env_1 = require("./env");
exports.databaseConfig = {
    host: env_1.env.DB_HOST,
    port: env_1.env.DB_PORT,
    name: env_1.env.DB_NAME,
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD,
};
//# sourceMappingURL=database.js.map