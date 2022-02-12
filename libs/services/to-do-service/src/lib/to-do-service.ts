import { to_do } from '@prisma/client';
import { TodoCreateType, TodoDetailType } from '@to-do/api-schemas/todo-schema';
import {
    Create,
    failed,
    Get,
    Result,
    success,
    Update,
} from '@to-do/service-framework/service';
import mapper from '@to-do/mapper';
import { client } from '@to-do/repositories/prisma-repo';

export const createTodo: Create<TodoCreateType, TodoDetailType> = async (
    item: TodoCreateType
): Promise<Result<TodoDetailType>> => {
    const data = await mapper.mapAsync<TodoCreateType, to_do>(
        item,
        'to_do',
        'TodoCreateType'
    );
    const entity = await client.to_do.create({ data });

    if (!entity) {
        return failed('Unknown error');
    }

    const model = await mapper.mapAsync<to_do, TodoDetailType>(
        entity,
        'TodoDetailType',
        'to_do'
    );
    return success(model);
};

export const getTodo: Get<TodoDetailType> = async (
    id: number
): Promise<Result<TodoDetailType>> => {
    const entity = await client.to_do.findFirst({
        where: {
            id,
        },
    });

    if (!entity) {
        return failed('Not found');
    }

    const model = await mapper.mapAsync<to_do, TodoDetailType>(
        entity,
        'TodoDetailType',
        'to_do'
    );
    return success(model);
};

export default {
    createTodo,
    // updateTodo,
    getTodo,
};
