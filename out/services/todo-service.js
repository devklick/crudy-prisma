"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodo = exports.createTodo = void 0;
const service_types_1 = require("./service-types");
const mapper_1 = __importDefault(require("../mapper"));
const client_1 = __importDefault(require("../db/client"));
const createTodo = async (item) => {
    const data = await mapper_1.default.mapAsync(item, 'to_do', 'TodoCreateType');
    const entity = await client_1.default.to_do.create({ data });
    if (!entity) {
        return (0, service_types_1.failed)('Unknown error');
    }
    const model = await mapper_1.default.mapAsync(entity, 'TodoDetailType', 'to_do');
    return (0, service_types_1.success)(model);
};
exports.createTodo = createTodo;
const getTodo = async (id) => {
    const entity = await client_1.default.to_do.findFirst({
        where: {
            id,
        },
    });
    if (!entity) {
        return (0, service_types_1.failed)('Not found');
    }
    const model = await mapper_1.default.mapAsync(entity, 'TodoDetailType', 'to_do');
    return (0, service_types_1.success)(model);
};
exports.getTodo = getTodo;
exports.default = {
    createTodo: exports.createTodo,
    // updateTodo,
    getTodo: exports.getTodo,
};
//# sourceMappingURL=todo-service.js.map