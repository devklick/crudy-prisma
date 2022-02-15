import { UserSessionDetailType } from '@to-do/api-schemas/user-session-schema';

declare global {
    namespace Express {
        interface Request {
            /**
             * Allows the current user session to be attached to the request object.
             * This is something that is taken care of by the session middleware.
             */
            session?: UserSessionDetailType;

            /**
             * Allows the validated payload to be attached to the request object.
             * This is taken care of by the validation middleware.
             * Ideally we'd avoid the use of `any`, but it doesnt seem possible
             * to pass generic types down to this level.
             */
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validatedData: any;
        }
    }
}
