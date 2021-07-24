"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logger_1 = __importDefault(require("./utilities/logger"));
var index_1 = __importDefault(require("./routes/index"));
var images_1 = __importDefault(require("./routes/api/images"));
var app = express_1.default();
app.use(express_1.default.static('resize'));
app.use(logger_1.default);
app.use('/', index_1.default);
app.use('/api', index_1.default);
app.use('/api/images', images_1.default);
exports.default = app;
