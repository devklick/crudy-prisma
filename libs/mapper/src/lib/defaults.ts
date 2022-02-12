import {
    CamelCaseNamingConvention,
    NamingConvention,
    SnakeCaseNamingConvention,
} from '@automapper/core';

export const apiToDbNamingConvention: {
    source: NamingConvention;
    destination: NamingConvention;
} = {
    source: new CamelCaseNamingConvention(),
    destination: new SnakeCaseNamingConvention(),
};

export const dbToApiNamingConvention: {
    source: NamingConvention;
    destination: NamingConvention;
} = {
    source: new SnakeCaseNamingConvention(),
    destination: new CamelCaseNamingConvention(),
};
