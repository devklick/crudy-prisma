import { Router } from 'express';
import sessionMiddleware from '../middleware/session-middleware';
import controller from '../controllers/to-do-controller';

export default Router()
    /**
     * All endpoints in this controller require an authenticated session.
     * We use the sessionMiddleware to take care of validating the session.
     */
    .all('*', sessionMiddleware)

    /**
     * GET /todo/:id
     * Gets a specific Todo item by it's internal ID.
     */
    .get('/:id', controller.getToDo)

    /**
     * POST /todo
     * Creates a new TODO item
     */
    .post('/', controller.createToDo);
