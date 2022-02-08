"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedUser = exports.getUserByEmailAddress = exports.getUserByUsername = exports.findUsers = exports.getUser = exports.createUser = void 0;
const service_types_1 = require("./service-types");
const client_1 = __importDefault(require("../db/client"));
const crypto_utils_1 = __importDefault(require("../utilities/crypto-utils"));
const mapper_1 = __importDefault(require("../mapper"));
const createUser = async (item) => {
    const data = await mapper_1.default.mapAsync(item, 'user', 'UserCreateType');
    const entity = await client_1.default.user.create({ data });
    if (!entity) {
        return (0, service_types_1.failed)('Failed to create user');
    }
    const model = await mapper_1.default.mapAsync(entity, 'UserDetailType', 'user');
    return (0, service_types_1.success)(model);
};
exports.createUser = createUser;
const getUser = async (id) => {
    const entity = await client_1.default.user.findFirst({
        where: {
            id,
        },
    });
    if (!entity) {
        return (0, service_types_1.failed)('Not found');
    }
    const model = await mapper_1.default.mapAsync(entity, 'UserDetailType', 'user');
    return (0, service_types_1.success)(model);
};
exports.getUser = getUser;
const findUsers = async (query) => {
    //TODO:  need to find a nice, reusable approach for creating these filters.
    // Need to support the calling code to pass in groups of filters
    const filters = [];
    if (query.createdOn !== undefined) {
        filters.push({ created_on: query.createdOn });
    }
    if (query.emailAddress !== undefined) {
        filters.push({ email_address: query.emailAddress });
    }
    if (query.emailAddressConfirmed !== undefined) {
        filters.push({ email_address_confirmed: query.emailAddressConfirmed });
    }
    if (query.id !== undefined) {
        filters.push({ id: query.id });
    }
    if (query.passwordHash !== undefined) {
        filters.push({ password_hash: query.passwordHash });
    }
    if (query.updatedOn) {
        filters.push({ updated_on: query.updatedOn });
    }
    if (query.username !== undefined) {
        filters.push({ username: query.username });
    }
    const entities = await client_1.default.user.findMany({
        where: {
            OR: filters,
        },
    });
    const models = await Promise.all(entities.map(async (user) => await mapper_1.default.mapAsync(user, 'UserDetailType', 'user')));
    return (0, service_types_1.success)(models);
};
exports.findUsers = findUsers;
const getUserByUsername = async (username) => {
    const users = await (0, exports.findUsers)({ username });
    if (!users.success) {
        return (0, service_types_1.failed)(...users.errors);
    }
    if (users.data.length !== 1) {
        return (0, service_types_1.failed)('Not found');
    }
    return (0, service_types_1.success)(users.data[0]);
};
exports.getUserByUsername = getUserByUsername;
const getUserByEmailAddress = async (emailAddress) => {
    const users = await (0, exports.findUsers)({ emailAddress });
    if (!users.success) {
        return (0, service_types_1.failed)(...users.errors);
    }
    if (users.data.length !== 1) {
        return (0, service_types_1.failed)('Not found');
    }
    return (0, service_types_1.success)(users.data[0]);
};
exports.getUserByEmailAddress = getUserByEmailAddress;
const getAuthenticatedUser = async (emailAddressOrUsername, password) => {
    const users = await (0, exports.findUsers)({
        emailAddress: emailAddressOrUsername,
        username: emailAddressOrUsername,
    });
    if (!users.success) {
        return (0, service_types_1.failed)(...users.errors);
    }
    if (users.data.length !== 1) {
        return (0, service_types_1.failed)('Not found');
    }
    const user = users.data[0];
    if (await crypto_utils_1.default.compare(password, user.passwordHash)) {
        return (0, service_types_1.success)(user);
    }
    return (0, service_types_1.failed)('Incorrect password');
};
exports.getAuthenticatedUser = getAuthenticatedUser;
// eslint-disable-next-line import/no-anonymous-default-export
exports.default = {
    createUser: exports.createUser,
    getUser: exports.getUser,
    findUsers: exports.findUsers,
    getUserByUsername: exports.getUserByUsername,
    getUserByEmailAddress: exports.getUserByEmailAddress,
    getAuthenticatedUser: exports.getAuthenticatedUser,
};
//# sourceMappingURL=user-service.js.map