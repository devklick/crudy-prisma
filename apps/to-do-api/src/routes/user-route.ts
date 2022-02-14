import { Router } from 'express';
import sessionMiddleware from '../middleware/session-middleware';
import validationMiddleware, {
    HttpDataSource,
    setDataSource,
} from '../middleware/validation-middleware';
import controller from '../controllers/user-controller';
import {
    userCreateSchema,
    userGetSchema,
    userLoginSchema,
} from '@to-do/api-schemas/user-schema';

export default Router()
    /**
     * GET user/:id
     * Used to fetch an existing user by it's internal ID.
     * Requires an authenticated session.
     */
    .get(
        '/:id',
        sessionMiddleware,
        validationMiddleware(
            userGetSchema,
            setDataSource(HttpDataSource.Params),
            setDataSource(HttpDataSource.Session, false)
        ),
        controller.getUser
    )

    /**
     * POST /user
     * Used to create a new user
     */
    .post(
        '/',
        validationMiddleware(
            userCreateSchema,
            setDataSource(HttpDataSource.Body)
        ),
        controller.createUser
    )

    /**
     * POST /user/login
     * Used to authenticate an existing user
     */
    .post(
        '/login',
        validationMiddleware(
            userLoginSchema,
            setDataSource(HttpDataSource.Body)
        ),
        controller.login
    );
