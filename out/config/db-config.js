"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
const config = {
    dbUrl: (0, helper_1.getEnvVar)('DATABASE_URL', { requirement: 'REQUIRED' }),
    systemUserPassword: (0, helper_1.getEnvVar)('SYSTEM_USER_PASSWORD', { requirement: 'REQUIRED' })
};
exports.default = config;
//# sourceMappingURL=db-config.js.map