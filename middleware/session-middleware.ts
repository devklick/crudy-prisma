import express from 'express';
import userSessionService from '../services/user-session-service';

/**
 * Takes the session token from the header and validates it.
 * If no session token is present, or the session token is invalid or expired, the caller is unauthorised.
 * Otherwise, if the session token is valid, the caller is authorised and the call wil be routed to the relevant controller.
 * When the session is successfully validated, the session details will be appended to the request body as `userSession`
 */
export default async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const sessionToken = req.headers['session-token'];
	if (!sessionToken || typeof sessionToken !== 'string') {
		return res.status(401).send('Not authenticated');
	}
	const sessions = await userSessionService.findUserSessions({ sessionToken });
	if (!sessions.success) {
		return res.status(500).send(sessions.errors);
	}
	if (sessions.data.length !== 1) {
		return res.status(401).send('Not authenticated');
	}
	req.body.userSession = sessions.data[0];

	return next();
};
