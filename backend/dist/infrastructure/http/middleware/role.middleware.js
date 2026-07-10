"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSoporte = exports.requireSuperAdmin = exports.requireAdmin = void 0;
exports.roleMiddleware = roleMiddleware;
const roleHierarchy = {
    super_admin: 5,
    admin: 4,
    soporte: 3,
    gerente: 2,
    empleado: 1,
    contador: 1,
};
function roleMiddleware(requiredRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            return;
        }
        const userRole = user.rol;
        if (!requiredRoles.includes(userRole)) {
            // Check hierarchy - higher roles can access lower role routes
            const userLevel = roleHierarchy[userRole] || 0;
            const requiredLevel = Math.max(...requiredRoles.map(r => roleHierarchy[r] || 0));
            if (userLevel < requiredLevel) {
                res.status(403).json({
                    success: false,
                    error: 'Insufficient permissions'
                });
                return;
            }
        }
        next();
    };
}
// Specific role middleware helpers
exports.requireAdmin = roleMiddleware(['super_admin', 'admin']);
exports.requireSuperAdmin = roleMiddleware(['super_admin']);
exports.requireSoporte = roleMiddleware(['super_admin', 'admin', 'soporte']);
//# sourceMappingURL=role.middleware.js.map