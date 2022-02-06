import { PrismaClient } from '@prisma/client'
import * as status from './status.seed'
import * as user from './user.seed'
import * as todoPatch1 from '../patch/todo.patch.20220204_1'

const prisma = new PrismaClient();

/**
 * Seeding is the process of adding new data. 
 * Seeding will also take care of patching new data
 */

const main = async (): Promise<void> => {
    await status.seed(prisma);
    await user.seed(prisma);
    await todoPatch1.patch(prisma);
}

main()
    .catch( e => { throw e })
    .finally( async () => await prisma.$disconnect() );