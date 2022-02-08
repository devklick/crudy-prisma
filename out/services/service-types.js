"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failed = exports.success = void 0;
const success = (data) => ({
    success: true,
    data,
});
exports.success = success;
const failed = (...errors) => ({
    success: false,
    errors,
});
exports.failed = failed;
//# sourceMappingURL=service-types.js.map