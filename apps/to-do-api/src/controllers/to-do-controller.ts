import { ActionMethod, respond } from '@to-do/service-framework/controller';

import {
    todoCreateSchema,
    todoGetSchema,
} from '@to-do/api-schemas/todo-schema';
import todoService from '@to-do/services/to-do-service';

export const getToDo: ActionMethod = async (req, res) => {
    const validation = todoGetSchema.safeParse({
        ...req.params,
        userSession: req.session,
    });

    if (!validation.success) {
        return respond(res, 400, validation.error.errors);
    }

    const result = await todoService.getTodo(validation.data.id);

    if (result.success) {
        return respond(res, 200, result.data);
    }

    return respond(res, 404, result.errors);
};

export const createToDo: ActionMethod = async (req, res) => {
    const validation = await todoCreateSchema.safeParseAsync({
        ...req.body,
        userSession: req.session,
    });

    if (!validation.success) {
        return respond(res, 400, validation.error.errors);
    }

    const result = await todoService.createTodo(validation.data);

    if (result.success) {
        return respond(res, 200, result.data);
    }

    return respond(res, 500, result.errors);
};

export default {
    getToDo,
    createToDo,
};
