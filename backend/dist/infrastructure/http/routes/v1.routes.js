"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Routes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const user_routes_1 = require("./user.routes");
const router = (0, express_1.Router)();
exports.v1Routes = router;
// Mount routes
router.use('/auth', auth_routes_1.authRoutes);
router.use('', user_routes_1.userRoutes);
//# sourceMappingURL=v1.routes.js.map