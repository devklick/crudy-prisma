import {
    UserCreateType,
    UserGetType,
    UserLoginType,
} from '@to-do/api-schemas/user-schema';
import { ActionMethod, respond } from '@to-do/service-framework/controller';
import userService from '@to-do/services/user-service';
import userSessionService from '@to-do/services/user-session-service';
import jwt from 'jsonwebtoken';
import config from '../config';

export const getUser: ActionMethod = async (req, res) => {
    const result = await userService.getUser(
        (req.validatedData as UserGetType).id
    );

    if (result.success) {
        return respond(res, 200, result.data);
    }

    return respond(res, 404, result.errors);
};

export const createUser: ActionMethod = async (req, res) => {
    const result = await userService.createUser(
        req.validatedData as UserCreateType
    );

    if (result.success) {
        return respond(res, 201, result.data);
    }

    return respond(res, 500, result.errors);
};

export const login: ActionMethod = async (req, res) => {
    const { emailAddressOrUsername, password } =
        req.validatedData as UserLoginType;

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

    // const expiresIn = 60 * 15 * 1000; // 15 mins
    const expiresIn = 60 * 15 * 1000 * 4 * 12; // 12 hours during dev. // TODO: Reset this to 15 mins
    const expiry = new Date(Date.now() + expiresIn);
    const token = jwt.sign(session, config.jwt.secret, { expiresIn });
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
