import { createMetadataMap } from '@automapper/pojos';
import { TodoCreateType, TodoDetailType } from '@to-do/api-schemas/todo-schema';
import { StatusIds } from '@to-do/repositories/prisma-repo';

import { mapFrom, MappingProfile } from '@automapper/core';
import { to_do } from '@prisma/client';
import { apiToDbNamingConvention, dbToApiNamingConvention } from '../defaults';

createMetadataMap<TodoCreateType>('TodoCreateType', {
    title: String,
    assignedToId: Number,
    deadline: Date,
    description: String,
    status: typeof StatusIds,
});

createMetadataMap<TodoDetailType>('TodoDetailType', {
    assignedToId: Number,
    createdById: Number,
    createdOn: Date,
    deadline: String,
    description: String,
    id: Number,
    status: typeof StatusIds,
    title: String,
    updatedOn: Date,
});

createMetadataMap<to_do>('to_do', {
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

const todoMappingProfile: MappingProfile = (mapper) => {
    mapper
        .createMap<TodoCreateType, to_do>('TodoCreateType', 'to_do', {
            namingConventions: apiToDbNamingConvention,
        })
        .forMember(
            (dest) => dest.status_id,
            mapFrom((source) => source.status as number)
        )
        .forMember(
            (dest) => dest.created_by_id,
            mapFrom((source) => source.userSession.userId)
        )
        .forMember(
            (dest) => dest.assigned_to_id,
            mapFrom(
                (source) => source.assignedToId ?? source.userSession.userId
            )
        );

    mapper
        .createMap<to_do, TodoDetailType>('to_do', 'TodoDetailType', {
            namingConventions: dbToApiNamingConvention,
        })
        .forMember(
            (dest) => dest.status,
            mapFrom((source) => source.status_id)
        );
};

export default todoMappingProfile;
