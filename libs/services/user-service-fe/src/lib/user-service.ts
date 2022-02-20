import {
    UserCreateResultType,
    UserCreateType,
    UserLoginResultType,
    UserLoginType,
} from '@to-do/api-schemas/user-schema';
import axios from 'axios';
import { StatusCode } from 'status-code-enum';

const userApi = axios.create({
    baseURL: 'http://localhost:3023/user',
});

export const login = async (
    loginRequest: UserLoginType
): Promise<UserLoginResultType> => {
    const result = await userApi.request<UserLoginResultType>({
        method: 'POST',
        url: 'login',
        data: loginRequest,
    });
    if (result.status === StatusCode.SuccessOK) {
        return result.data;
    }
    throw new Error('Figure out what to do with this!');
};

export const signUp = async (
    signUpRequest: UserCreateType
): Promise<UserCreateResultType> => {
    const result = await userApi.request<UserCreateResultType>({
        method: 'POST',
        data: signUpRequest,
    });
    if (result.status === StatusCode.SuccessCreated) {
        return result.data;
    }
    throw new Error('Figure out what to do with this!');
};

export default {
    login,
    signUp,
};
