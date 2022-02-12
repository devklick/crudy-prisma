import { PrismaClient } from '@prisma/client';
import cryptoUtils from '@to-do/utilities/crypto-utils';
import dbConfig from '../../config';

export const SYSTEM_USER_ID = 0;
export const seed = async (prisma: PrismaClient): Promise<void> => {
    const password = dbConfig.systemUserPassword;
    if (!password) {
        throw new Error('SYSTEM_USER_PASSWORD environment variable not found');
    }
    await prisma.user.upsert({
        create: {
            username: 'SYSTEM',
            id: SYSTEM_USER_ID,
            email_address: 'SYSTEM@todo.com',
            password_hash: await cryptoUtils.hashString(password),
            email_address_confirmed: true,
        },
        where: {
            id: SYSTEM_USER_ID,
        },
        update: {
            password_hash: await cryptoUtils.hashString(password),
        },
    });
};

export default { seed };
