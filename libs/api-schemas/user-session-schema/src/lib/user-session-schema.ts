import { z } from 'zod';
import { zDate } from '@to-do/api-schemas/common';

const id = z.number().int();
const sessionToken = z.string().length(128);
const createdOn = zDate();
const updatedOn = zDate();
const expiresOn = zDate();
const userId = z.number().int();

export const userSessionCreateSchema = z.object({
    userId,
});
export const userSessionDetailSchema = z.object({
    userId,
    sessionToken,
    createdOn,
    updatedOn,
    expiresOn,
});

export type UserSessionCreateType = z.infer<typeof userSessionCreateSchema>;

export type UserSessionDetailType = z.infer<typeof userSessionDetailSchema>;

// TODO: Need to implement "find" types, that allow filtering on ranges etc. This applies to all entities, not just this one.
