"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userGetSchema = exports.userDetailSchema = exports.userCreateSchema = void 0;
const zod_1 = require("zod");
const user_service_1 = __importDefault(require("../services/user-service"));
const common_types_1 = require("./common-types");
const user_session_schema_1 = require("./user-session-schema");
const id = zod_1.z.number().int();
const createdOn = (0, common_types_1.zDate)();
const updatedOn = (0, common_types_1.zDate)().optional().nullable();
const username = zod_1.z.string().max(64); // TODO: need to refind this to make sure it's a "sluggish" value
const emailAddress = zod_1.z.string().email().max(64);
const emailAddressConfirmed = zod_1.z.boolean().default(false);
const password = zod_1.z
    .string()
    .min(8)
    .max(64)
    .regex(/\d/, { message: 'At least one number required' })
    .regex(/[a-z]/, { message: 'At least one lower case letter required' })
    .regex(/[A-Z]/, { message: 'At least one upper case letter required' })
    .regex(/\W/, { message: 'At least one special character required' });
exports.userCreateSchema = zod_1.z.object({
    // prettier-ignore
    username: username.refine(async (value) => {
        const existing = await user_service_1.default.getUserByUsername(value);
        if (!existing.success)
            return true;
    }, { message: 'Username already exists', }),
    // prettier-ignore
    emailAddress: emailAddress.refine(async (value) => {
        const existing = await user_service_1.default.getUserByEmailAddress(value);
        if (!existing.success)
            return true;
    }, { message: 'Email address already registered', }),
    password,
    emailAddressConfirmed, // for dev/testing only
});
exports.userDetailSchema = zod_1.z.object({
    id,
    createdOn,
    updatedOn,
    username,
    emailAddress,
    passwordHash: zod_1.z.string(),
    emailAddressConfirmed,
});
exports.userGetSchema = zod_1.z.object({
    id: (0, common_types_1.zRouteNumericId)(),
    session: user_session_schema_1.userSessionDetailSchema,
});
exports.userLoginSchema = zod_1.z.object({
    password: zod_1.z.string(),
    emailAddressOrUsername: username.or(emailAddress),
});
//# sourceMappingURL=user-schema.js.map