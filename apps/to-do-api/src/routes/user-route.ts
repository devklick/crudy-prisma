import { Router } from 'express';
import sessionMiddleware from '../middleware/session-middleware';
import controller from '../controllers/user-controller';

export default Router()
    /**
     * GET user/:id
     * Used to fetch an existing user by it's internal ID.
     * Requires an authenticated session.
     */
    .get('/:id', sessionMiddleware, controller.getUser)

    /**
     * POST /user
     * Used to create a new user
     */
    .post('/', controller.createUser)

    /**
     * POST /user/login
     * Used to authenticate an existing user
     */
    .post('/login', controller.login);
