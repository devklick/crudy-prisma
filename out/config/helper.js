"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = void 0;
const getEnvVar = (name, options = { requirement: 'REQUIRED', defaultValue: undefined }) => {
    var _a;
    let value = process.env[name];
    // TODO: Add in some logic to check the requirement level and handle accordingly
    const newValue = (_a = value) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.defaultValue;
    if (options.requirement === 'REQUIRED' && newValue === undefined) {
        throw new Error(`Environment variable ${name} is required`);
    }
    // Use the nonnull assertion here to put the responsibility on the calling code to specify the relevant
    // generic type (e.g. string | undefined) and options {e.g. requirement: OPTIONAL};
    return newValue;
};
exports.getEnvVar = getEnvVar;
//# sourceMappingURL=helper.js.map