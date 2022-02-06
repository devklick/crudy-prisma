import express from 'express';
import { todoCreateSchema, todoGetSchema } from '../api-models/todo-schema';
import sessionMiddleware from '../middleware/session-middleware';
import todoService from '../services/todo-service';

export default express
	.Router()
	/**
	 * All endpoints in this controller require an authenticated session.
	 * We use the sessionMiddleware to take care of validating the session.
	 */
	.all('*', sessionMiddleware)
	/**
	 * GET /todo/:id
	 * Gets a specific Todo item by it's internal ID.
	 */
	.get('/:id', async (req, res) => {
		const validation = todoGetSchema.safeParse(req.params);

		if (!validation.success) {
			return res.status(400).send(validation.error.errors);
		}

		const result = await todoService.getTodo(validation.data.id);

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
		const validation = await todoCreateSchema.safeParseAsync(req.body);

		if (!validation.success) {
			return res.status(400).send(validation.error.errors);
		}

		const result = await todoService.createTodo(validation.data);

		if (result.success) {
			return res.status(200).send(result.data);
		}

		return res.status(500).send(result.errors);
	});
