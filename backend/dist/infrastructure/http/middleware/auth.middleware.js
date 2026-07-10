"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthMiddleware = exports.authMiddleware = void 0;
const JwtService_1 = require("../../services/JwtService");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Access token is missing or invalid' });
            return;
        }
        const token = authHeader.split(' ')[1];
        const payload = JwtService_1.JwtService.verifyAccessToken(token);
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json({ error: error.message || 'Unauthorized' });
    }
};
exports.authMiddleware = authMiddleware;
const optionalAuthMiddleware = (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const payload = JwtService_1.JwtService.verifyAccessToken(token);
            req.user = payload;
        }
        next();
    }
    catch (error) {
        // Continue without user context
        next();
    }
};
exports.optionalAuthMiddleware = optionalAuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map