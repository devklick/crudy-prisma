import { getEnvVar } from '@to-do/utilities/environment-utils';

const config = {
    port: getEnvVar<number>('PORT', {
        requirement: 'PREFERRED',
        defaultValue: 3023,
    }),
    jwt: {
        secret: getEnvVar<string>('JWT_SECRET', { requirement: 'REQUIRED' }),
        accessTokenDuration: getEnvVar<number>('JWT_ACCESS_TOKEN_DURATION', {
            requirement: 'OPTIONAL',
            defaultValue: 3600,
        }),
        refreshTokenDuration: getEnvVar<number>('JWT_REFRESH_TOKEN_DURATION', {
            requirement: 'OPTIONAL',
            defaultValue: 86400,
        }),
    },
};

export default config;
