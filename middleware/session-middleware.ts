import express from 'express';
import userSessionService from '../services/user-session-service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import apiConfig from '../config/api-config';
import { userSessionDetailSchema } from '../api-models/user-session-schema';

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
	let accessToken = req.headers["x-access-token"] || req.headers['authorization'];
	if (!accessToken || typeof accessToken !== 'string') {
		return res.status(401).send('Not authenticated');
	}
	if (accessToken.startsWith('Bearer ')) {
		accessToken = accessToken.substring('Bearer '.length);
	}
	const decoded = jwt.verify(accessToken, apiConfig.jwtSecret) as JwtPayload;
	const parsed = await userSessionDetailSchema.safeParseAsync(decoded.data);
	if (!parsed.success) {
		return res.status(401).send('Invalid token');
	}

	const sessions = await userSessionService.findUserSessions({ sessionToken: parsed.data.sessionToken });
	if (!sessions.success) {
		return res.status(500).send(sessions.errors);
	}
	if (sessions.data.length !== 1) {
		return res.status(401).send('Invalid session');
	}
	req.session = sessions.data[0];

	return next();
};

export default middleware;