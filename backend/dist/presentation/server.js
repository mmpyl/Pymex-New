"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const sequelize_instance_1 = require("../infrastructure/database/config/sequelize-instance");
const env_1 = require("../config/env");
const startServer = async () => {
    try {
        // Connect to database
        await (0, sequelize_instance_1.connectDatabase)();
        await (0, sequelize_instance_1.syncDatabase)();
        // Create and start app
        const app = (0, app_1.createApp)();
        app.listen(env_1.env.PORT, () => {
            console.log(`Server running on port ${env_1.env.PORT}`);
            console.log(`Environment: ${env_1.env.NODE_ENV}`);
            console.log(`Swagger docs: http://localhost:${env_1.env.PORT}/api-docs`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map