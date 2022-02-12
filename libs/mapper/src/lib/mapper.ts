import { createMapper } from '@automapper/core';
import { pojos } from '@automapper/pojos';
import todoMappingProfile from './profiles/todo-mapping-profile';
import userMappingProfile from './profiles/user-mapping-profile';

const mapper = createMapper({
    name: 'defaultMapper',
    pluginInitializer: pojos,
});

mapper.addProfile(todoMappingProfile).addProfile(userMappingProfile);

export default mapper;
