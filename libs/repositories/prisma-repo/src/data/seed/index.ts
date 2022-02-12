import { client } from '../../client';
import status from './status.seed';
import user from './user.seed';
import dotenv from 'dotenv';

dotenv.config();

const main = async (): Promise<void> => {
    await status.seed(client);
    await user.seed(client);
};

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => await client.$disconnect());
