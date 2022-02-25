import { UserLoginResultType } from '@to-do/api-schemas/user-schema';
import { atom } from 'recoil';

export const authState = atom<UserLoginResultType | null>({
    key: 'authState',
    default: null,
});
