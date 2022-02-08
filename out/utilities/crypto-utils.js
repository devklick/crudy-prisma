"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomString = exports.compare = exports.hashStringSync = exports.hashString = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const hashString = async (value) => await bcrypt_1.default.hash(value, await bcrypt_1.default.genSalt(12));
exports.hashString = hashString;
const hashStringSync = (value) => bcrypt_1.default.hashSync(value, bcrypt_1.default.genSaltSync(12));
exports.hashStringSync = hashStringSync;
const compare = async (one, two) => await bcrypt_1.default.compare(one, two);
exports.compare = compare;
const createRandomString = (length = 128) => crypto_1.default
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
exports.createRandomString = createRandomString;
// eslint-disable-next-line import/no-anonymous-default-export
exports.default = {
    hashString: exports.hashString,
    hashStringSync: exports.hashStringSync,
    compare: exports.compare,
    createRandomString: exports.createRandomString,
};
//# sourceMappingURL=crypto-utils.js.map