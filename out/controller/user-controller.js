"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_schema_1 = require("../api-models/user-schema");
const session_middleware_1 = __importDefault(require("../middleware/session-middleware"));
const user_service_1 = __importDefault(require("../services/user-service"));
const user_session_service_1 = __importDefault(require("../services/user-session-service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_config_1 = __importDefault(require("../config/api-config"));
exports.default = express_1.default
    .Router()
    /**
     * GET user/:id
     * Used to fetch an existing user by it's internal ID.
     * Requires an authenticated session.
     */
    .get('/:id', session_middleware_1.default, async (req, res) => {
    // Because the sessionMiddleware adds the authenticated userSession to the request body,
    // and this is expected by the schema, we spread the URL params and request body into a new object to validate.
    const validation = await user_schema_1.userGetSchema.safeParseAsync({ ...req.params, session: req.session });
    if (!validation.success) {
        return res.status(400).send(validation.error.errors);
    }
    const result = await user_service_1.default.getUser(validation.data.id);
    if (result.success) {
        return res.status(200).send(result.data);
    }
    return res.status(404).send(result.errors);
})
    /**
     * POST /user
     * Used to create a new user
     */
    .post('/', async (req, res) => {
    const validation = await user_schema_1.userCreateSchema.safeParseAsync(req.body);
    if (!validation.success) {
        return res.status(400).send(validation.error.errors);
    }
    const result = await user_service_1.default.createUser(validation.data);
    if (result.success) {
        return res.status(200).send(result.data);
    }
    return res.status(500).send(result.errors);
})
    /**
     * POST /user/login
     * Used to authenticate an existing user
     */
    .post('/login', async (req, res) => {
    const validation = await user_schema_1.userLoginSchema.safeParseAsync(req.body);
    if (!validation.success) {
        return res.status(400).send(validation.error.errors);
    }
    const { emailAddressOrUsername, password } = validation.data;
    const user = await user_service_1.default.getAuthenticatedUser(emailAddressOrUsername, password);
    if (!user.success) {
        return res.status(401).send(user.errors);
    }
    const session = await user_session_service_1.default.createUserSession({ userId: user.data.id });
    const expiresIn = 60 * 15; // 15 mins
    const expiry = new Date(Date.now() + expiresIn);
    const token = jsonwebtoken_1.default.sign(session, api_config_1.default.jwtSecret, { expiresIn });
    const response = { token, expiry };
    if (session.success) {
        return res.status(200).send(response);
    }
    return res.status(500).send(session.errors);
});
//# sourceMappingURL=user-controller.js.map