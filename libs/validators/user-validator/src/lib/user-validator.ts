import { client } from '@to-do/repositories/prisma-repo';
import { failed, Result, success } from '@to-do/service-framework/service';

/**
 * Checks whether or not the specified username is available.
 * @param username The username to be checked
 * @returns `Success` when the username is available, or `Failed` when it is already in use.
 */
export const usernameAvailable = async (
    username: string
): Promise<Result<void>> => {
    const existing = await client.user.findFirst({
        where: { username: { equals: username, mode: 'insensitive' } },
    });
    return existing ? failed('Username already registered') : success();
};

/**
 * Checks whether or not the specified email address is available.
 * @param emailAddress The email address to be checked
 * @returns `Success` when the email address is available, or `Failed` when it is already in use.
 */
export const emailAddressAvailable = async (
    emailAddress: string
): Promise<Result<void>> => {
    const existing = await client.user.findFirst({
        where: { email_address: { equals: emailAddress, mode: 'insensitive' } },
    });
    return existing ? failed('Email address already registered') : success();
};

export default {
    usernameAvailable,
    emailAddressAvailable,
};
