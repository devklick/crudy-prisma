"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const user_controller_1 = __importDefault(require("./controller/user-controller"));
const todo_controller_1 = __importDefault(require("./controller/todo-controller"));
const api_config_1 = __importDefault(require("./config/api-config"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/user', user_controller_1.default);
app.use('/todo', todo_controller_1.default);
app.listen(api_config_1.default.port, () => {
    console.log(`Running on port ${api_config_1.default.port}.`);
});
//# sourceMappingURL=main.js.map