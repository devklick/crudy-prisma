"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This patch is to back-fill the relevant user ID's into any to_do records,
 * so the user ID columns can then be made required rather than optional.
 *
 * Note that this no longer compiles as the columns, which allowed null at the time
 * this function was created, now no longer allow null.
 *
 * Function left here for reference only.
 * @param prisma
 */
// export const patch = async (prisma: PrismaClient): Promise<void> => {
//     await prisma.to_do.updateMany({
//         where: {
//             created_by_id: null,
//         },
//         data: {
//             created_by_id: SYSTEM_USER_ID
//         }
//     });
//     await prisma.to_do.updateMany({
//         where: {
//             assigned_to_id: null
//         },
//         data: {
//             assigned_to_id: SYSTEM_USER_ID
//         }
//     });
// }
//# sourceMappingURL=todo.patch.20220204_1.js.map