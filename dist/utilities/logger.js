"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winstonLogger_1 = __importDefault(require("./winstonLogger"));
var logger = function (req, res, next) {
    var url = req.path;
    winstonLogger_1.default.log({
        level: 'info',
        message: url,
    });
    next();
};
exports.default = logger;
