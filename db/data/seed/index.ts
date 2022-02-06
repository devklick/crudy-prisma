import client from '../../client';
import * as status from './status.seed'
import * as user from './user.seed'
import dotenv from 'dotenv';

dotenv.config();


/**
 * Seeding is the process of adding new data. 
 * Seeding will also take care of patching new data
 */

const main = async (): Promise<void> => {
    await status.seed(client);
    await user.seed(client);
    //await todoPatch1.patch(prisma);
}

main()
    .catch(e => { throw e })
    .finally(async () => await client.$disconnect());