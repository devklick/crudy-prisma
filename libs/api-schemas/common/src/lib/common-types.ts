import { z } from 'zod';

/**
 * Expects a that represents a date, converts it to a Date type.
 */
export const zDate = () =>
    z
        .string()
        .or(z.date())
        .transform((arg) => new Date(arg));

/**
 * Expects a string that represents a number, converts it to a number type.
 * This is intended for use in URL query parameters.
 */
export const zRouteNumericId = () =>
    z.string().regex(/^\d+$/).transform(Number);

//https://github.com/colinhacks/zod/issues/310#issuecomment-919420331
const emptyStringToUndefined = z.literal('').transform(() => undefined);

export const zOptional = <T extends z.ZodTypeAny>(schema: T) =>
    schema.optional().or(emptyStringToUndefined);
