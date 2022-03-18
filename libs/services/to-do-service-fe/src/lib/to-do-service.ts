import {
    TodoDetailType,
    TodoStatusDetailType,
    TodoUpdateType,
} from '@to-do/api-schemas/todo-schema';
import axios from 'axios';
import StatusCode from 'status-code-enum';

const todoApi = axios.create({
    baseURL: 'http://localhost:3023/todo',
});

export const getTodoList = async (token: string): Promise<TodoDetailType[]> => {
    const result = await todoApi.request<TodoDetailType[]>({
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (result.status === StatusCode.SuccessOK) {
        return result.data;
    }
    throw new Error('Figure out what to do with this!');
};

export const getStatuses = async (
    token: string
): Promise<TodoStatusDetailType[]> => {
    const result = await todoApi.request<TodoStatusDetailType[]>({
        method: 'GET',
        url: 'status',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (result.status === StatusCode.SuccessOK) {
        return result.data;
    }
    throw new Error('Figure out what to do with this!');
};

export const updateTodo = async (
    token: string,
    data: TodoUpdateType
): Promise<TodoDetailType> => {
    const result = await todoApi.request<TodoDetailType>({
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        data,
    });
    if (result.status === StatusCode.SuccessOK) {
        return result.data;
    }
    throw new Error('Figure out what to do with this!');
};

export default {
    getTodoList,
    getStatuses,
    updateTodo,
};
