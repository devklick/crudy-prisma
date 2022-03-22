import { validator } from '@to-do/validators/user-validator';
import {
    emailAddress,
    userCreateSchemaBaseDefinition,
    username,
} from '@to-do/api-schemas/user-schema';

/**
 * A schema that is the exact same as `userCreateSchema`, however also
 * validates the `username` and `emailAddress` to make sure they are unique.
 *
 * This depends on `prisma`, so should only be used in the backend.
 */
export const userCreateSchemaDBValidation =
    userCreateSchemaBaseDefinition.extend({
        // prettier-ignore
        username: username.refine(async value => {
        const valid = await validator.usernameAvailable(value);
        return valid.success;
    }, { message: 'Username already exists', }),
        // prettier-ignore
        emailAddress: emailAddress.refine(async value => {
        const valid = await validator.emailAddressAvailable(value);
        return valid.success;
    }, { message: 'Email address already registered', }),
    });
