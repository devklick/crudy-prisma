export type Requirement = 'REQUIRED' | 'PREFERRED' | 'OPTIONAL';

export type GetEnvVarOptions<T> = {
    requirement?: Requirement;
    defaultValue?: T;
};

export const getEnvVar = <T = string>(
    name: string,
    options: GetEnvVarOptions<T> = {
        requirement: 'REQUIRED',
        defaultValue: undefined,
    }
): T => {
    let value = process.env[name];

    // TODO: Add in some logic to check the requirement level and handle accordingly

    const newValue = (value as unknown as T) ?? options?.defaultValue;

    if (options.requirement === 'REQUIRED' && newValue === undefined) {
        throw new Error(`Environment variable ${name} is required`);
    }

    // Use the nonnull assertion here to put the responsibility on the calling code to specify the relevant
    // generic type (e.g. string | undefined) and options {e.g. requirement: OPTIONAL};
    return newValue!;
};
