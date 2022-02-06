import { PrismaClient } from "@prisma/client";

export const SYSTEM_USER_ID = 0;
export const seed = async (prisma: PrismaClient): Promise<void> => {
    await prisma.user.upsert({
        create: {
            username: 'SYSTEM',
            id: SYSTEM_USER_ID
        },
        where: {
            id: SYSTEM_USER_ID
        },
        update: {}
    })
}