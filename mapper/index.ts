import { createMapper } from '@automapper/core';
import { pojos } from '@automapper/pojos';
import todoMappingProfile from "./profiles/todo-mapping-profile";

export default createMapper({
    name: 'defaultMapper',
    pluginInitializer: pojos,
}).addProfile(todoMappingProfile);

