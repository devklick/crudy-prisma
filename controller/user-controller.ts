import express from 'express';
import { userCreateSchema, userGetSchema, userLoginSchema } from '../api-models/user-schema';
import sessionMiddleware from '../middleware/session-middleware';
import userService from '../services/user-service';
import userSessionService from '../services/user-session-service';

export default express
	.Router()
	/**
	 * GET user/:id
	 * Used to fetch an existing user by it's internal ID.
	 * Requires an authenticated session.
	 */
	.get('/:id', sessionMiddleware, async (req, res) => {
		// Because the sessionMiddleware adds the authenticated userSession to the request body,
		// and this is expected by the schema, we spread the URL params and request body into a new object to validate.
		const validation = await userGetSchema.safeParseAsync({ ...req.params, ...req.body });

		if (!validation.success) {
			return res.status(400).send(validation.error.errors);
		}

		const result = await userService.getUser(validation.data.id);

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
		const validation = await userCreateSchema.safeParseAsync(req.body);

		if (!validation.success) {
			return res.status(400).send(validation.error.errors);
		}

		const result = await userService.createUser(validation.data);

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
		const validation = await userLoginSchema.safeParseAsync(req.body);

		if (!validation.success) {
			return res.status(400).send(validation.error.errors);
		}
		const { emailAddressOrUsername, password } = validation.data;
		const result = await userService.getAuthenticatedUser(
			emailAddressOrUsername,
			password
		);
		if (!result.success) {
			return res.status(401).send(result.errors);
		}
		const session = await userSessionService.createUserSession({ userId: result.data.id });
		if (session.success) {
			return res.status(200).send(session.data);
		}
		return res.status(500).send(session.errors);
	});
