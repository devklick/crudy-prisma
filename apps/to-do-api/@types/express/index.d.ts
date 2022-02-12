import { UserSessionDetailType } from '@to-do/api-schemas/user-session-schema';

declare global {
    namespace Express {
        interface Request {
            /**
             * Allows the current user session to be attached to the request object.
             * This is something that is taken care of by the session middleware.
             */
            session?: UserSessionDetailType;
        }
    }
}
