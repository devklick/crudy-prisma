"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zRouteNumericId = exports.zDate = void 0;
const zod_1 = require("zod");
/**
 * Expects a that represents a date, converts it to a Date type.
 */
const zDate = () => zod_1.z
    .string()
    .or(zod_1.z.date())
    .transform(arg => new Date(arg));
exports.zDate = zDate;
/**
 * Expects a string that represents a number, converts it to a number type.
 * This is intended for use in URL query parameters.
 */
const zRouteNumericId = () => zod_1.z.string().regex(/^\d+$/).transform(Number);
exports.zRouteNumericId = zRouteNumericId;
//# sourceMappingURL=common-types.js.map