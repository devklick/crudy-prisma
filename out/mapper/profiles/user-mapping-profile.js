"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pojos_1 = require("@automapper/pojos");
const defaults_1 = require("../defaults");
const core_1 = require("@automapper/core");
const crypto_utils_1 = __importDefault(require("../../utilities/crypto-utils"));
(0, pojos_1.createMetadataMap)('UserCreateType', {
    emailAddress: String,
    emailAddressConfirmed: Boolean,
    password: String,
    username: String
});
(0, pojos_1.createMetadataMap)('UserDetailType', {
    createdOn: Date,
    emailAddress: String,
    emailAddressConfirmed: Boolean,
    id: Number,
    passwordHash: String,
    updatedOn: Date,
    username: String
});
(0, pojos_1.createMetadataMap)('UserGetType', {
    id: Number,
    session: Object // Not sure about this yet. Thinking it might not be needed here.
});
(0, pojos_1.createMetadataMap)('user', {
    created_on: Date,
    email_address: String,
    email_address_confirmed: Boolean,
    id: Number,
    password_hash: String,
    updated_on: Date,
    username: String
});
const userMappingProfile = mapper => {
    mapper
        .createMap('UserCreateType', 'user', {
        namingConventions: defaults_1.apiToDbNamingConvention
    })
        .forMember(dest => dest.password_hash, (0, core_1.mapFrom)(source => crypto_utils_1.default.hashStringSync(source.password)));
    mapper.createMap('user', 'UserDetailType', {
        namingConventions: defaults_1.dbToApiNamingConvention
    });
};
exports.default = userMappingProfile;
//# sourceMappingURL=user-mapping-profile.js.map