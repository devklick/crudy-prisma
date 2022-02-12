import {
    userCreateSchema,
    userGetSchema,
    userLoginSchema,
} from '@to-do/api-schemas/user-schema';
import { ActionMethod, respond } from '@to-do/service-framework/controller';
import userService from '@to-do/services/user-service';
import userSessionService from '@to-do/services/user-session-service';
import jwt from 'jsonwebtoken';
import config from '../config';

export const getUser: ActionMethod = async (req, res) => {
    // Because the sessionMiddleware adds the authenticated userSession to the request body,
    // and this is expected by the schema, we spread the URL params and request body into a new object to validate.
    const validation = await userGetSchema.safeParseAsync({
        ...req.params,
        session: req.session,
    });

    if (!validation.success) {
        return respond(res, 400, validation.error.errors);
    }

    const result = await userService.getUser(validation.data.id);

    if (result.success) {
        return respond(res, 200, result.data);
    }

    return respond(res, 404, result.errors);
};

export const createUser: ActionMethod = async (req, res) => {
    const validation = await userCreateSchema.safeParseAsync(req.body);

    if (!validation.success) {
        return respond(res, 400, validation.error.errors);
    }

    const result = await userService.createUser(validation.data);

    if (result.success) {
        return respond(res, 200, result.data);
    }

    return respond(res, 500, result.errors);
};

export const login: ActionMethod = async (req, res) => {
    const validation = await userLoginSchema.safeParseAsync(req.body);

    if (!validation.success) {
        return respond(res, 400, validation.error.errors);
    }
    const { emailAddressOrUsername, password } = validation.data;
    const user = await userService.getAuthenticatedUser(
        emailAddressOrUsername,
        password
    );
    if (!user.success) {
        return respond(res, 401, user.errors);
    }
    if (!user.data?.id) {
        return respond(res, 401, 'An error occurred while logging in');
    }
    const session = await userSessionService.createUserSession({
        userId: user.data.id,
    });

    const expiresIn = 60 * 15; // 15 mins
    const expiry = new Date(Date.now() + expiresIn);
    const token = jwt.sign(session, config.jwtSecret, { expiresIn });
    const response = { token, expiry };

    if (session.success) {
        return respond(res, 200, response);
    }
    return respond(res, 500, session.errors);
};

export default {
    getUser,
    createUser,
    login,
};
