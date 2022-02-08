"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbToApiNamingConvention = exports.apiToDbNamingConvention = void 0;
const core_1 = require("@automapper/core");
exports.apiToDbNamingConvention = {
    source: new core_1.CamelCaseNamingConvention(),
    destination: new core_1.SnakeCaseNamingConvention()
};
exports.dbToApiNamingConvention = {
    source: new core_1.SnakeCaseNamingConvention(),
    destination: new core_1.CamelCaseNamingConvention()
};
//# sourceMappingURL=defaults.js.map