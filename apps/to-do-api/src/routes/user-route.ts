import { Router } from 'express';
import sessionMiddleware from '../middleware/session-middleware';
import validationMiddleware, {
    HttpDataSource,
    setDataSource,
} from '../middleware/validation-middleware';
import controller from '../controllers/user-controller';
import {
    userGetSchema,
    userLoginSchema,
    userLogoutSchema,
    usersFindSchema,
} from '@to-do/api-schemas/user-schema';
import { userCreateSchemaDBValidation } from '@to-do/api-schemas/user-schema-extended';

export default Router()
    .get(
        '/',
        sessionMiddleware,
        validationMiddleware(
            usersFindSchema,
            setDataSource(HttpDataSource.Params),
            setDataSource(HttpDataSource.Session, false)
        ),
        controller.findUsers
    )

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
            userCreateSchemaDBValidation,
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
    )

    /**
     * POST /user/logout
     * Used to log out of an existing user session
     */
    .post(
        '/logout',
        sessionMiddleware,
        validationMiddleware(
            userLogoutSchema,
            setDataSource(HttpDataSource.Session, false)
        ),
        controller.logout
    );
