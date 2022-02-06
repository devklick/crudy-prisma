import { getEnvVar } from "./helper";

const config = {
    port: getEnvVar<number>('PORT', { requirement: 'PREFERRED', defaultValue: 3023 })
};

export default config;