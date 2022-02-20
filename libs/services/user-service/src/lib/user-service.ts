import { UserCreateType, UserDetailType } from '@to-do/api-schemas/user-schema';
import {
    Create,
    failed,
    Find,
    Get,
    Result,
    success,
} from '@to-do/service-framework/service';
import { client } from '@to-do/repositories/prisma-repo';
import { Prisma, user } from '@prisma/client';
import cryptoUtils from '@to-do/utilities/crypto-utils';
import mapper from '@to-do/mapper';

export const createUser: Create<UserCreateType, UserDetailType> = async (
    item: UserCreateType
): Promise<Result<UserDetailType>> => {
    const data = await mapper.mapAsync<UserCreateType, user>(
        item,
        'user',
        'UserCreateType'
    );
    const entity = await client.user.create({ data });

    if (!entity) {
        return failed('Failed to create user');
    }
    const model = await mapper.mapAsync<user, UserDetailType>(
        entity,
        'UserDetailType',
        'user'
    );
    return success(model);
};

export const getUser: Get<UserDetailType> = async (
    id: number
): Promise<Result<UserDetailType>> => {
    const entity = await client.user.findFirst({
        where: {
            id,
        },
    });
    if (!entity) {
        return failed('Not found');
    }
    const model = await mapper.mapAsync<user, UserDetailType>(
        entity,
        'UserDetailType',
        'user'
    );

    return success(model);
};

export const findUsers: Find<UserDetailType> = async (
    query: Partial<UserDetailType>
): Promise<Result<UserDetailType[]>> => {
    //TODO:  need to find a nice, reusable approach for creating these filters.
    // Need to support the calling code to pass in groups of filters
    const filters: Prisma.userWhereInput[] = [];
    if (query.createdOn !== undefined) {
        filters.push({ created_on: query.createdOn });
    }
    if (query.emailAddress !== undefined) {
        filters.push({ email_address: query.emailAddress });
    }
    if (query.id !== undefined) {
        filters.push({ id: query.id });
    }
    if (query.passwordHash !== undefined) {
        filters.push({ password_hash: query.passwordHash });
    }
    if (query.updatedOn) {
        filters.push({ updated_on: query.updatedOn });
    }
    if (query.username !== undefined) {
        filters.push({ username: query.username });
    }

    const entities = await client.user.findMany({
        where: {
            OR: filters,
        },
    });

    const models: UserDetailType[] = await Promise.all(
        entities.map(
            async (user) =>
                await mapper.mapAsync<user, UserDetailType>(
                    user,
                    'UserDetailType',
                    'user'
                )
        )
    );

    return success<UserDetailType[]>(models);
};

export const getAuthenticatedUser = async (
    emailAddressOrUsername: string,
    password: string
): Promise<Result<UserDetailType>> => {
    const users = await findUsers({
        emailAddress: emailAddressOrUsername,
        username: emailAddressOrUsername,
    });
    if (!users.success) {
        return failed(...users.errors);
    }
    if (users.data?.length !== 1) {
        return failed('Not found');
    }
    const user = users.data[0];
    if (await cryptoUtils.compare(password, user.passwordHash)) {
        return success(user);
    }
    return failed('Incorrect password');
};

export default {
    createUser,
    getUser,
    findUsers,
    getAuthenticatedUser,
};
