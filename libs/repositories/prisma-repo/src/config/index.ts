import { getEnvVar } from '@to-do/utilities/environment-utils';

const config = {
    dbUrl: getEnvVar<string>('DATABASE_URL', { requirement: 'REQUIRED' }),
    systemUserPassword: getEnvVar<string>('SYSTEM_USER_PASSWORD', {
        requirement: 'REQUIRED',
    }),
};

export default config;
