"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
const config = {
    port: (0, helper_1.getEnvVar)('PORT', { requirement: 'PREFERRED', defaultValue: 3023 }),
    jwtSecret: (0, helper_1.getEnvVar)('JWT_SECRET', { requirement: 'REQUIRED' })
};
exports.default = config;
//# sourceMappingURL=api-config.js.map