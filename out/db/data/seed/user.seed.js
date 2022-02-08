"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = exports.SYSTEM_USER_ID = void 0;
const crypto_utils_1 = __importDefault(require("../../../utilities/crypto-utils"));
const db_config_1 = __importDefault(require("../../../config/db-config"));
exports.SYSTEM_USER_ID = 0;
const seed = async (prisma) => {
    const password = db_config_1.default.systemUserPassword;
    if (!password) {
        throw new Error('SYSTEM_USER_PASSWORD environment variable not found');
    }
    await prisma.user.upsert({
        create: {
            username: 'SYSTEM',
            id: exports.SYSTEM_USER_ID,
            email_address: 'SYSTEM@todo.com',
            password_hash: await crypto_utils_1.default.hashString(password),
            email_address_confirmed: true
        },
        where: {
            id: exports.SYSTEM_USER_ID
        },
        update: {
            password_hash: await crypto_utils_1.default.hashString(password)
        }
    });
};
exports.seed = seed;
//# sourceMappingURL=user.seed.js.map