import { createMetadataMap } from '@automapper/pojos';
import { UserCreateType, } from '../../api-models/user-schema';

import {
    CamelCaseNamingConvention,
    mapFrom,
    MappingProfile,
    SnakeCaseNamingConvention,
} from '@automapper/core';
import { user } from '@prisma/client';