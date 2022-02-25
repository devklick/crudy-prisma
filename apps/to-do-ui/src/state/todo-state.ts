import { TodoDetailType } from '@to-do/api-schemas/todo-schema';
import { atom } from 'recoil';

export const todosState = atom<TodoDetailType[] | null>({
    key: 'todosState',
    default: [],
});
