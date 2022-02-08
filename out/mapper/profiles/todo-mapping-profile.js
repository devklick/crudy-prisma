"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pojos_1 = require("@automapper/pojos");
const status_seed_1 = require("../../db/data/seed/status.seed");
const core_1 = require("@automapper/core");
const defaults_1 = require("../defaults");
(0, pojos_1.createMetadataMap)('TodoCreateType', {
    title: String,
    assignedToId: Number,
    deadline: Date,
    description: String,
    status: typeof status_seed_1.StatusIds,
});
(0, pojos_1.createMetadataMap)('TodoDetailType', {
    assignedToId: Number,
    createdById: Number,
    createdOn: Date,
    deadline: String,
    description: String,
    id: Number,
    status: typeof status_seed_1.StatusIds,
    title: String,
    updatedOn: Date,
});
(0, pojos_1.createMetadataMap)('to_do', {
    title: String,
    assigned_to_id: Number,
    created_by_id: Number,
    deadline: Date,
    description: String,
    id: Number,
    created_on: Date,
    updated_on: Date,
    status_id: Number,
});
const todoMappingProfile = mapper => {
    mapper
        .createMap('TodoCreateType', 'to_do', {
        namingConventions: defaults_1.apiToDbNamingConvention
    })
        .forMember(dest => dest.status_id, (0, core_1.mapFrom)(source => source.status))
        .forMember(dest => dest.created_by_id, (0, core_1.mapFrom)(source => source.userSession.userId))
        .forMember(dest => dest.assigned_to_id, (0, core_1.mapFrom)(source => { var _a; return (_a = source.assignedToId) !== null && _a !== void 0 ? _a : source.userSession.userId; }));
    mapper
        .createMap('to_do', 'TodoDetailType', {
        namingConventions: defaults_1.dbToApiNamingConvention
    })
        .forMember(dest => dest.status, (0, core_1.mapFrom)(source => source.status_id));
};
exports.default = todoMappingProfile;
//# sourceMappingURL=todo-mapping-profile.js.map