"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cors_2 = require("../config/cors");
const error_middleware_1 = require("../infrastructure/http/middleware/error.middleware");
const auth_routes_1 = require("../infrastructure/http/routes/auth.routes");
const user_routes_1 = require("../infrastructure/http/routes/user.routes");
const admin_routes_1 = require("../infrastructure/http/routes/admin.routes");
const swagger_config_1 = require("../infrastructure/http/swagger/swagger.config");
const createApp = () => {
    const app = (0, express_1.default)();
    // Security middleware
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)(cors_2.corsConfig));
    // Body parsing middleware
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    // API Routes
    app.use('/api/v1/auth', auth_routes_1.authRoutes);
    app.use('/api/v1/admin', admin_routes_1.adminRoutes);
    app.use('/api/v1', user_routes_1.userRoutes);
    // Swagger documentation
    app.use('/api-docs', swagger_config_1.swaggerUi.serve, swagger_config_1.swaggerUi.setup(swagger_config_1.swaggerSpec));
    // Health check endpoint
    app.get('/health', (_req, res) => {
        res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    });
    // 404 handler
    app.use((_req, res) => {
        res.status(404).json({ error: 'Route not found' });
    });
    // Global error handler
    app.use(error_middleware_1.errorMiddleware);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map