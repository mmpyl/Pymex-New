"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const env_1 = require("./env");
exports.corsConfig = {
    origin: env_1.env.CORS_ORIGIN === '*' ? '*' : env_1.env.CORS_ORIGIN.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400,
};
//# sourceMappingURL=cors.js.map