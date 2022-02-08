"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_session_service_1 = __importDefault(require("../services/user-session-service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_config_1 = __importDefault(require("../config/api-config"));
const user_session_schema_1 = require("../api-models/user-session-schema");
/**
 * Takes the session token from the header and validates it.
 * If no session token is present, or the session token is invalid or expired, the caller is unauthorised.
 * Otherwise, if the session token is valid, the caller is authorised and the call wil be routed to the relevant controller.
 * When the session is successfully validated, the session details will be appended to the request body as `userSession`
 */
const middleware = async (req, res, next) => {
    let accessToken = req.headers["x-access-token"] || req.headers['authorization'];
    if (!accessToken || typeof accessToken !== 'string') {
        return res.status(401).send('Not authenticated');
    }
    if (accessToken.startsWith('Bearer ')) {
        accessToken = accessToken.substring('Bearer '.length);
    }
    const decoded = jsonwebtoken_1.default.verify(accessToken, api_config_1.default.jwtSecret);
    const parsed = await user_session_schema_1.userSessionDetailSchema.safeParseAsync(decoded.data);
    if (!parsed.success) {
        return res.status(401).send('Invalid token');
    }
    const sessions = await user_session_service_1.default.findUserSessions({ sessionToken: parsed.data.sessionToken });
    if (!sessions.success) {
        return res.status(500).send(sessions.errors);
    }
    if (sessions.data.length !== 1) {
        return res.status(401).send('Invalid session');
    }
    req.session = sessions.data[0];
    return next();
};
exports.default = middleware;
//# sourceMappingURL=session-middleware.js.map