"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_schema_1 = require("../api-models/todo-schema");
const session_middleware_1 = __importDefault(require("../middleware/session-middleware"));
const todo_service_1 = __importDefault(require("../services/todo-service"));
exports.default = express_1.default
    .Router()
    /**
     * All endpoints in this controller require an authenticated session.
     * We use the sessionMiddleware to take care of validating the session.
     */
    .all('*', session_middleware_1.default)
    /**
     * GET /todo/:id
     * Gets a specific Todo item by it's internal ID.
     */
    .get('/:id', async (req, res) => {
    const validation = todo_schema_1.todoGetSchema.safeParse(req.params);
    if (!validation.success) {
        return res.status(400).send(validation.error.errors);
    }
    const result = await todo_service_1.default.getTodo(validation.data.id);
    if (result.success) {
        return res.status(200).send(result.data);
    }
    return res.status(404).send(result.errors);
})
    /**
     * POST /todo
     * Creates a new TODO item
     */
    .post('/', async (req, res) => {
    const validation = await todo_schema_1.todoCreateSchema.safeParseAsync(req.body);
    if (!validation.success) {
        return res.status(400).send(validation.error.errors);
    }
    const result = await todo_service_1.default.createTodo(validation.data);
    if (result.success) {
        return res.status(200).send(result.data);
    }
    return res.status(500).send(result.errors);
});
//# sourceMappingURL=todo-controller.js.map