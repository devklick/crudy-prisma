import { UserSessionDetailType } from '@to-do/api-schemas/user-session-schema';
import { atom } from 'recoil';

export const sessionState = atom<UserSessionDetailType | null>({
    key: 'sessionState',
    default: null,
});
