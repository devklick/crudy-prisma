import { ActionMethod, respond } from '@to-do/service-framework/controller';

import { TodoCreateType, TodoGetType } from '@to-do/api-schemas/todo-schema';
import todoService from '@to-do/services/to-do-service';

export const getToDo: ActionMethod = async (req, res) => {
    const result = await todoService.getTodo(
        (req.validatedData as TodoGetType).id
    );

    if (result.success) {
        return respond(res, 200, result.data);
    }

    return respond(res, 404, result.errors);
};

export const createToDo: ActionMethod = async (req, res) => {
    const result = await todoService.createTodo(
        req.validatedData as TodoCreateType
    );

    if (result.success) {
        return respond(res, 200, result.data);
    }

    return respond(res, 500, result.errors);
};

export const findTodos: ActionMethod = async (req, res) => {
    const result = await todoService.findTodos(req.validatedData);
    if (result.success) {
        return respond(res, 200, result.data);
    }

    return respond(res, 500, result.errors);
};

export const findTodoStatus: ActionMethod = async (req, res) => {
    const result = await todoService.findTodoStatuses(req.validatedData);
    if (result.success) {
        return respond(res, 200, result.data);
    }

    return respond(res, 500, result.errors);
};

export default {
    getToDo,
    createToDo,
    findTodos,
    findTodoStatus,
};
