"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserSessions = exports.createUserSession = void 0;
const service_types_1 = require("./service-types");
const client_1 = __importDefault(require("../db/client"));
const crypto_utils_1 = __importDefault(require("../utilities/crypto-utils"));
const createUserSession = async (item) => {
    const newSessionExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
    // If a valid session already exists, update it to last another 24 hours
    let existing = await client_1.default.user_session.findFirst({
        where: {
            user_id: item.userId,
            expires_on: {
                gt: new Date(),
            },
        },
    });
    if (existing) {
        existing = await client_1.default.user_session.update({
            where: {
                id: existing.id,
            },
            data: {
                expires_on: newSessionExpiry,
            },
        });
        return (0, service_types_1.success)({
            createdOn: existing.created_on,
            expiresOn: existing.expires_on,
            sessionToken: existing.session_token,
            updatedOn: existing.updated_on,
            userId: existing.user_id,
        });
    }
    // Otherwise create a new session
    const result = await client_1.default.user_session.create({
        data: {
            expires_on: newSessionExpiry,
            session_token: crypto_utils_1.default.createRandomString(),
            user_id: item.userId,
        },
    });
    if (!result) {
        return (0, service_types_1.failed)('Failed to create session');
    }
    return (0, service_types_1.success)({
        createdOn: result.created_on,
        expiresOn: result.expires_on,
        sessionToken: result.session_token,
        updatedOn: result.updated_on,
        userId: result.user_id,
    });
};
exports.createUserSession = createUserSession;
// TODO: Come up with a better approach at "find"ing data. This approach only allows OR statements.
const findUserSessions = async (query) => {
    const filters = [];
    if (query.createdOn !== undefined) {
        filters.push({ created_on: query.createdOn });
    }
    if (query.expiresOn !== undefined) {
        filters.push({ expires_on: query.expiresOn });
    }
    if (query.sessionToken !== undefined) {
        filters.push({ session_token: query.sessionToken });
    }
    if (query.updatedOn !== undefined) {
        filters.push({ updated_on: query.updatedOn });
    }
    if (query.userId !== undefined) {
        filters.push({ user_id: query.userId });
    }
    const results = await client_1.default.user_session.findMany({
        where: {
            OR: filters,
        },
    });
    const data = results.map(session => ({
        userId: session.user_id,
        sessionToken: session.session_token,
        createdOn: session.created_on,
        updatedOn: session.updated_on,
        expiresOn: session.expires_on,
    }));
    return (0, service_types_1.success)(data);
};
exports.findUserSessions = findUserSessions;
exports.default = {
    createUserSession: exports.createUserSession,
    findUserSessions: exports.findUserSessions,
};
//# sourceMappingURL=user-session-service.js.map