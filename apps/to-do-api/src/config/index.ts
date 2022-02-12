import { getEnvVar } from '@to-do/utilities/environment-utils';

const config = {
    port: getEnvVar<number>('PORT', {
        requirement: 'PREFERRED',
        defaultValue: 3023,
    }),
    jwtSecret: getEnvVar<string>('JWT_SECRET', { requirement: 'REQUIRED' }),
};

export default config;
