import { Router } from 'express';
import sessionMiddleware from '../middleware/session-middleware';
import validationMiddleware, {
    HttpDataSource,
    setDataSource,
} from '../middleware/validation-middleware';
import controller from '../controllers/to-do-controller';
import {
    todoCreateSchema,
    todoFindSchema,
    todoGetSchema,
    todoStatusFindSchema,
} from '@to-do/api-schemas/todo-schema';

export default Router()
    /**
     * All endpoints in this controller require an authenticated session.
     * We use the sessionMiddleware to take care of validating the session.
     */
    .all('*', sessionMiddleware)

    /**
     * GET /todo
     * Gets multiple Todo items matching the optional criteria.
     * If no criteria is specified, fetches all items.
     */
    .get(
        '/',
        validationMiddleware(
            todoFindSchema,
            setDataSource(HttpDataSource.Query),
            setDataSource(HttpDataSource.Session, false)
        ),
        controller.findTodos
    )

    /**
     * POST /todo
     * Creates a new TODO item
     */
    .post(
        '/',
        validationMiddleware(
            todoCreateSchema,
            setDataSource(HttpDataSource.Body),
            setDataSource(HttpDataSource.Session, false)
        ),
        controller.createToDo
    )

    .get(
        '/status',
        validationMiddleware(
            todoStatusFindSchema,
            setDataSource(HttpDataSource.Query),
            setDataSource(HttpDataSource.Session, false)
        ),
        controller.findTodoStatus
    )

    /**
     * GET /todo/:id
     * Gets a specific Todo item by it's internal ID.
     */
    .get(
        '/:id',
        validationMiddleware(
            todoGetSchema,
            setDataSource(HttpDataSource.Params),
            setDataSource(HttpDataSource.Session, false)
        ),
        controller.getToDo
    );
