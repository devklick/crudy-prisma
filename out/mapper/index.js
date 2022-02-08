"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@automapper/core");
const pojos_1 = require("@automapper/pojos");
const todo_mapping_profile_1 = __importDefault(require("./profiles/todo-mapping-profile"));
const user_mapping_profile_1 = __importDefault(require("./profiles/user-mapping-profile"));
const mapper = (0, core_1.createMapper)({
    name: 'defaultMapper',
    pluginInitializer: pojos_1.pojos,
});
mapper
    .addProfile(todo_mapping_profile_1.default)
    .addProfile(user_mapping_profile_1.default);
exports.default = mapper;
//# sourceMappingURL=index.js.map