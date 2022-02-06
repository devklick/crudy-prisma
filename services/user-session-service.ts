import {
	UserSessionCreateType,
	UserSessionDetailType,
} from '../api-models/user-session-schema';
import { Create, failed, Find, Result, success } from './service-types';
import client from '../db/client';
import cryptoUtils from '../utilities/crypto-utils';
import { Prisma } from '@prisma/client';

export const createUserSession: Create<UserSessionCreateType, UserSessionDetailType> = async (
	item: UserSessionCreateType
): Promise<Result<UserSessionDetailType>> => {
	const newSessionExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
	// If a valid session already exists, update it to last another 24 hours
	let existing = await client.user_session.findFirst({
		where: {
			user_id: item.userId,
			expires_on: {
				gt: new Date(),
			},
		},
	});

	if (existing) {
		existing = await client.user_session.update({
			where: {
				id: existing.id,
			},
			data: {
				expires_on: newSessionExpiry,
			},
		});
		return success<UserSessionDetailType>({
			createdOn: existing.created_on,
			expiresOn: existing.expires_on,
			sessionToken: existing.session_token,
			updatedOn: existing.updated_on,
			userId: existing.user_id,
		});
	}
	// Otherwise create a new session
	const result = await client.user_session.create({
		data: {
			expires_on: newSessionExpiry,
			session_token: cryptoUtils.createRandomString(),
			user_id: item.userId,
		},
	});
	if (!result) {
		return failed('Failed to create session');
	}
	return success<UserSessionDetailType>({
		createdOn: result.created_on,
		expiresOn: result.expires_on,
		sessionToken: result.session_token,
		updatedOn: result.updated_on,
		userId: result.user_id,
	});
};

// TODO: Come up with a better approach at "find"ing data. This approach only allows OR statements.
export const findUserSessions: Find<UserSessionDetailType> = async (
	query: Partial<UserSessionDetailType>
): Promise<Result<UserSessionDetailType[]>> => {
	const filters: Prisma.user_sessionWhereInput[] = [];
	if (query.createdOn !== undefined) {
		filters.push({ created_on: query.createdOn });
	}
	if (query.expiresOn !== undefined) {
		filters.push({ expires_on: query.expiresOn });
	}
	if (query.sessionToken !== undefined) {
		filters.push({ session_token: query.sessionToken });
	}
	if (query.updatedOn !== undefined) {
		filters.push({ updated_on: query.updatedOn });
	}
	if (query.userId !== undefined) {
		filters.push({ user_id: query.userId });
	}
	const results = await client.user_session.findMany({
		where: {
			OR: filters,
		},
	});

	const data: UserSessionDetailType[] = results.map(session => ({
		userId: session.user_id,
		sessionToken: session.session_token,
		createdOn: session.created_on,
		updatedOn: session.updated_on,
		expiresOn: session.expires_on,
	}));

	return success(data);
};

export default {
	createUserSession,
	findUserSessions,
};
