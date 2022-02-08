"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSessionDetailSchema = exports.userSessionCreateSchema = void 0;
const zod_1 = require("zod");
const common_types_1 = require("./common-types");
const id = zod_1.z.number().int();
const sessionToken = zod_1.z.string().length(128);
const createdOn = (0, common_types_1.zDate)();
const updatedOn = (0, common_types_1.zDate)();
const expiresOn = (0, common_types_1.zDate)();
const userId = zod_1.z.number().int();
exports.userSessionCreateSchema = zod_1.z.object({
    userId,
});
exports.userSessionDetailSchema = zod_1.z.object({
    userId,
    sessionToken,
    createdOn,
    updatedOn,
    expiresOn,
});
// TODO: Need to implement "find" types, that allow filtering on ranges etc. This applies to all entities, not just this one.
//# sourceMappingURL=user-session-schema.js.map