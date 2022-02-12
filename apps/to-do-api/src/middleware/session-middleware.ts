import express from 'express';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userSessionDetailSchema } from '@to-do/api-schemas/user-session-schema';
import userSessionService from '@to-do/services/user-session-service';

/**
 * Takes the session token from the header and validates it.
 * If no session token is present, or the session token is invalid or expired, the caller is unauthorised.
 * Otherwise, if the session token is valid, the caller is authorised and the call wil be routed to the relevant controller.
 * When the session is successfully validated, the session details will be appended to the request body as `userSession`
 */
const middleware = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    let accessToken =
        req.headers['x-access-token'] || req.headers['authorization'];
    if (!accessToken || typeof accessToken !== 'string') {
        return res.status(401).send('Not authenticated');
    }
    if (accessToken.startsWith('Bearer ')) {
        accessToken = accessToken.substring('Bearer '.length);
    }
    const decoded = verifyToken(accessToken, config.jwtSecret);
    if (!decoded) {
        return res.status(401).send('Invalid token');
    }
    const parsed = await userSessionDetailSchema.safeParseAsync(decoded?.data);
    if (!parsed.success) {
        return res.status(401).send('Invalid token');
    }

    const sessions = await userSessionService.findUserSessions({
        sessionToken: parsed.data.sessionToken,
    });
    if (!sessions.success) {
        return res.status(500).send(sessions.errors);
    }
    if (sessions.data?.length !== 1) {
        return res.status(401).send('Invalid session');
    }
    req.session = sessions.data[0];

    return next();
};

const verifyToken = (token: string, secret: string): JwtPayload | null => {
    let decoded: JwtPayload | null = null;
    jwt.verify(token, secret, (error, token) => {
        if (!error) {
            decoded = token as JwtPayload;
        }
    });
    return decoded;
};

export default middleware;
