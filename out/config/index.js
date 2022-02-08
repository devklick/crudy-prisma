"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_config_1 = __importDefault(require("./api-config"));
const db_config_1 = __importDefault(require("./db-config"));
const config = {
    apiConfig: api_config_1.default,
    dbConfig: db_config_1.default
};
exports.default = config;
//# sourceMappingURL=index.js.map