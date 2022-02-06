import { UserCreateType, UserDetailType } from '../api-models/user-schema';
import { Create, failed, Find, Get, Result, success } from './service-types';
import client from '../db/client';
import { Prisma } from '@prisma/client';
import cryptoUtils from '../utilities/crypto-utils';

export const createUser: Create<UserCreateType, UserDetailType> = async (
	item: UserCreateType
): Promise<Result<UserDetailType>> => {
	const result = await client.user.create({
		data: {
			username: item.username,
			email_address: item.emailAddress,
			email_address_confirmed: item.emailAddressConfirmed,
			password_hash: await cryptoUtils.hashString(item.password),
		},
	});
	if (!result) {
		return failed('Failed to create user');
	}
	return success<UserDetailType>({
		id: result.id,
		username: result.username,
		createdOn: result.created_on,
		updatedOn: result.updated_on,
		emailAddress: result.email_address,
		emailAddressConfirmed: result.email_address_confirmed,
		passwordHash: result.password_hash,
	});
};

export const getUser: Get<UserDetailType> = async (
	id: number
): Promise<Result<UserDetailType>> => {
	const result = await client.user.findFirst({
		where: {
			id,
		},
	});
	if (!result) {
		return failed('Not found');
	}
	return success<UserDetailType>({
		id: result.id,
		username: result.username,
		createdOn: result.created_on,
		updatedOn: result.updated_on,
		emailAddress: result.email_address,
		emailAddressConfirmed: result.email_address_confirmed,
		passwordHash: result.password_hash,
	});
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
	if (query.emailAddressConfirmed !== undefined) {
		filters.push({ email_address_confirmed: query.emailAddressConfirmed });
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

	const result = await client.user.findMany({
		where: {
			OR: filters,
		},
	});

	const data: UserDetailType[] = result.map(row => ({
		id: row.id,
		username: row.username,
		createdOn: row.created_on,
		updatedOn: row.updated_on,
		emailAddress: row.email_address,
		emailAddressConfirmed: row.email_address_confirmed,
		passwordHash: row.password_hash,
	}));

	return success<UserDetailType[]>(data);
};

export const getUserByUsername = async (username: string): Promise<Result<UserDetailType>> => {
	const users = await findUsers({ username });

	if (!users.success) {
		return failed(...users.errors);
	}
	if (users.data.length != 1) {
		return failed('Not found');
	}
	return success(users.data[0]);
};

export const getUserByEmailAddress = async (
	emailAddress: string
): Promise<Result<UserDetailType>> => {
	const users = await findUsers({ emailAddress });
	if (!users.success) {
		return failed(...users.errors);
	}
	if (users.data.length != 1) {
		return failed('Not found');
	}
	return success(users.data[0]);
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
	if (users.data.length !== 1) {
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
	getUserByUsername,
	getUserByEmailAddress,
	getAuthenticatedUser,
};
