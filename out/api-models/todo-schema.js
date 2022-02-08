"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoUpdateSchema = exports.todoGetSchema = exports.todoDetailSchema = exports.todoCreateSchema = void 0;
const zod_1 = require("zod");
const status_seed_1 = require("../db/data/seed/status.seed");
const common_types_1 = require("./common-types");
const user_session_schema_1 = require("./user-session-schema");
const id = zod_1.z.number().int();
const createdOn = (0, common_types_1.zDate)();
const updatedOn = (0, common_types_1.zDate)().optional().nullable();
const title = zod_1.z.string().nonempty().max(64);
const description = zod_1.z.string().max(256).optional().nullable();
const deadline = (0, common_types_1.zDate)().optional().nullable();
const status = zod_1.z.nativeEnum(status_seed_1.StatusIds);
const createdById = zod_1.z.number().int();
const assignedToId = zod_1.z.number().int();
const userSession = user_session_schema_1.userSessionDetailSchema;
exports.todoCreateSchema = zod_1.z.object({
    title,
    description,
    deadline,
    status,
    // Only an authenticated user can create a todo item, so we expect a user session.
    // This is taken care of by the session-middleware.
    userSession,
    // This is optional when creating a todo item.
    // If it's not specified, the todo item will automatically be assigned to the authenticated user.
    assignedToId: assignedToId.optional(),
});
exports.todoDetailSchema = zod_1.z.object({
    id,
    createdOn,
    updatedOn,
    title,
    description,
    deadline,
    status,
    createdById,
    assignedToId,
});
exports.todoGetSchema = zod_1.z.object({
    id: (0, common_types_1.zRouteNumericId)(),
    // Only an authenticated user can create a todo item, so we expect a user session.
    // This is taken care of by the session-middleware.
    userSession,
});
exports.todoUpdateSchema = zod_1.z
    .object({
    id,
    title,
    description,
    deadline,
    status,
    createdById,
    assignedToId,
})
    .partial({
    title: true,
    description: true,
    deadline: true,
    status: true,
    createdById: true,
    assignedToId: true,
});
//# sourceMappingURL=todo-schema.js.map