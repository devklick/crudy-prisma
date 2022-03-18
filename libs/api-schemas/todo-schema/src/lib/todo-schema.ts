import { z } from 'zod';
import { zDate, zRouteNumericId } from '@to-do/api-schemas/common';
import { userSessionDetailSchema } from '@to-do/api-schemas/user-session-schema';

export enum StatusIds {
    ToDo = 0,
    InProgress = 1,
    Complete = 2,
    Parked = 3,
    Abandoned = 4,
}

const id = z.number().int();
const createdOn = zDate();
const updatedOn = zDate().optional().nullable();
const title = z.string().nonempty().max(64);
const description = z.string().max(256).optional().nullable();
const deadline = zDate().optional().nullable();
const status = z.nativeEnum(StatusIds);
const createdById = z.number().int();
const assignedToId = z.number().int();
const session = userSessionDetailSchema;

export const todoCreateSchema = z.object({
    title,
    description,
    deadline,
    status,
    // Only an authenticated user can create a todo item, so we expect a user session.
    // This is taken care of by the session-middleware.
    session,

    // This is optional when creating a todo item.
    // If it's not specified, the todo item will automatically be assigned to the authenticated user.
    assignedToId: assignedToId.optional(),
});

export const todoDetailSchema = z.object({
    id,
    createdOn,
    updatedOn,
    title,
    description,
    deadline,
    status,
    createdById,
    assignedToId,
});

export const todoGetSchema = z.object({
    id: zRouteNumericId(),
    // Only an authenticated user can create a todo item, so we expect a user session.
    // This is taken care of by the session-middleware.
    userSession: session,
});

export const todoFindSchema = todoDetailSchema.partial();

export const todoUpdateSchema = z
    .object({
        id,
        title,
        description,
        deadline,
        status,
        createdById,
        assignedToId,
    })
    .partial({
        title: true,
        description: true,
        deadline: true,
        status: true,
        createdById: true,
        assignedToId: true,
    });

export const todoStatusDetailSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    description: z.string(),
});

export const todoStatusFindSchema = todoStatusDetailSchema.partial();

export type TodoGetType = z.infer<typeof todoGetSchema>;
export type TodoFindType = z.infer<typeof todoFindSchema>;
export type TodoCreateType = z.infer<typeof todoCreateSchema>;
export type TodoUpdateType = z.infer<typeof todoUpdateSchema>;
export type TodoDetailType = z.infer<typeof todoDetailSchema>;
export type TodoStatusFindType = z.infer<typeof todoStatusFindSchema>;
export type TodoStatusDetailType = z.infer<typeof todoStatusDetailSchema>;
