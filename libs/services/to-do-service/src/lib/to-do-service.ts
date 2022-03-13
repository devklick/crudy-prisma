import { Prisma, status, to_do } from '@prisma/client';
import {
    TodoCreateType,
    TodoDetailType,
    TodoFindType,
    TodoStatusDetailType,
    TodoStatusFindType,
} from '@to-do/api-schemas/todo-schema';
import {
    Create,
    failed,
    Find,
    Get,
    Result,
    success,
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

export const findTodos: Find<TodoDetailType> = async (
    query: TodoFindType
): Promise<Result<TodoDetailType[]>> => {
    const queryParams = await mapper.mapAsync<TodoFindType, to_do>(
        query,
        'to_do',
        'TodoFindType'
    );

    const filters: Prisma.to_doWhereInput[] = [];

    if (queryParams.assigned_to_id !== undefined) {
        filters.push({ assigned_to_id: queryParams.assigned_to_id });
    }
    if (queryParams.created_by_id !== undefined) {
        filters.push({ created_by_id: queryParams.created_by_id });
    }
    if (queryParams.created_on !== undefined) {
        filters.push({ created_on: queryParams.created_on });
    }
    if (queryParams.deadline !== undefined) {
        filters.push({ deadline: queryParams.deadline });
    }
    if (queryParams.description !== undefined) {
        filters.push({ description: queryParams.description });
    }
    if (queryParams.id !== undefined) {
        filters.push({ id: queryParams.id });
    }
    if (queryParams.status_id !== undefined) {
        filters.push({ status_id: queryParams.status_id });
    }
    if (queryParams.title !== undefined) {
        filters.push({ title: queryParams.title });
    }
    if (queryParams.updated_on !== undefined) {
        filters.push({ updated_on: queryParams.updated_on });
    }

    const entities: to_do[] =
        filters.length === 0
            ? await client.to_do.findMany()
            : await client.to_do.findMany({
                  where: {
                      OR: filters,
                  },
              });

    const models: TodoDetailType[] = await Promise.all(
        entities.map(
            async (user) =>
                await mapper.mapAsync<to_do, TodoDetailType>(
                    user,
                    'TodoDetailType',
                    'to_do'
                )
        )
    );

    return success(models);
};

export const findTodoStatuses: Find<TodoStatusDetailType> = async (
    query: TodoStatusFindType
) => {
    const entities = await client.status.findMany();

    const models: TodoStatusDetailType[] = await Promise.all(
        entities.map(
            async (status) =>
                await mapper.mapAsync<status, TodoStatusDetailType>(
                    status,
                    'TodoStatusDetailType',
                    'status'
                )
        )
    );
    return success(models);
};

export default {
    createTodo,
    // updateTodo,
    getTodo,
    findTodos,
    findTodoStatuses,
};
