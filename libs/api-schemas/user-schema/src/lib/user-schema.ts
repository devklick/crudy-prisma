import { z } from 'zod';
import { zDate, zRouteNumericId } from '@to-do/api-schemas/common';
import { userSessionDetailSchema } from '@to-do/api-schemas/user-session-schema';

export const id = z.number().int();
export const createdOn = zDate();
export const updatedOn = zDate().optional().nullable();
export const username = z.string().max(64); // TODO: need to refind this to make sure it's a "sluggish" value
export const emailAddress = z.string().email().max(64);

export const password = z
    .string()
    .min(8)
    .max(64)
    .regex(/\d/, { message: 'At least one number required' })
    .regex(/[a-z]/, { message: 'At least one lower case letter required' })
    .regex(/[A-Z]/, { message: 'At least one upper case letter required' })
    .regex(/\W/, { message: 'At least one special character required' });

export const userCreateSchemaBaseDefinition = z.object({
    username,
    emailAddress,
    password,
    passwordConfirmed: z.string().max(64),
});

export const userCreateSchema = userCreateSchemaBaseDefinition.refine(
    (obj) => obj.password === obj.passwordConfirmed,
    {
        message: 'Password does not match',
        path: ['passwordConfirmed'],
    }
);

export const userDetailSchema = z.object({
    id,
    createdOn,
    updatedOn,
    username,
    emailAddress,
    passwordHash: z.string(),
});

export const userGetSchema = z.object({
    id: zRouteNumericId(),
    session: userSessionDetailSchema,
});

export const userLoginSchema = z.object({
    password: z.string(),
    emailAddressOrUsername: username.or(emailAddress),
});
export const userLoginResultSchema = z.object({
    token: z.string(),
    expiry: z.date(),
});
export const userCreateResultSchema = z.object({});

export type UserCreateType = z.infer<typeof userCreateSchema>;
export type UserDetailType = z.infer<typeof userDetailSchema>;
export type UserGetType = z.infer<typeof userGetSchema>;
export type UserLoginType = z.infer<typeof userLoginSchema>;
export type UserLoginResultType = z.infer<typeof userLoginResultSchema>;
export type UserCreateResultType = z.infer<typeof userCreateResultSchema>;
