import { createMetadataMap } from '@automapper/pojos';
import { UserCreateType, UserDetailType, UserGetType } from '../../api-models/user-schema';
import { apiToDbNamingConvention, dbToApiNamingConvention } from '../defaults';

import {
    mapFrom,
    MappingProfile,
} from '@automapper/core';
import { user } from '@prisma/client';
import cryptoUtils from '../../utilities/crypto-utils';

createMetadataMap<UserCreateType>('UserCreateType', {
    emailAddress: String,
    emailAddressConfirmed: Boolean,
    password: String,
    username: String
});

createMetadataMap<UserDetailType>('UserDetailType', {
    createdOn: Date,
    emailAddress: String,
    emailAddressConfirmed: Boolean,
    id: Number,
    passwordHash: String,
    updatedOn: Date,
    username: String
});

createMetadataMap<UserGetType>('UserGetType', {
    id: Number,
    session: Object // Not sure about this yet. Thinking it might not be needed here.
});

createMetadataMap<user>('user', {
    created_on: Date,
    email_address: String,
    email_address_confirmed: Boolean,
    id: Number,
    password_hash: String,
    updated_on: Date,
    username: String
});

const userMappingProfile: MappingProfile = mapper => {
    mapper
        .createMap<UserCreateType, user>('UserCreateType', 'user', {
            namingConventions: apiToDbNamingConvention
        })
        .forMember(
            dest => dest.password_hash,
            mapFrom(source => cryptoUtils.hashStringSync(source.password))
        );

    mapper.createMap<user, UserDetailType>('user', 'UserDetailType', {
        namingConventions: dbToApiNamingConvention
    });
};

export default userMappingProfile;