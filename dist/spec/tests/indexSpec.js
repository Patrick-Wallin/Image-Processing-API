"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("../../src/server"));
var supertest_1 = __importDefault(require("supertest"));
var filename_exist = 'encenadaport.jpg';
var filename_not_exist = 'whateveritis.jpg';
var resize_filename = 'encenadaport.jpg';
var width = 100;
var height = 100;
var overwrite = true;
var request = supertest_1.default(server_1.default);
describe('Testing Image Processor - API', function () {
    var _this = this;
    it('respond with get as / - status 200', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('respond with error saying that the filename is not found!', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/images?filename=test.jpg&width=100&height=100&overwrite=no')];
                case 1:
                    response = _a.sent();
                    expect(response.text.toLowerCase()).toContain('unable to process it');
                    return [2 /*return*/];
            }
        });
    }); });
    it('respond with error saying that the filename is blank!', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/images?filename=&width=100&height=100&overwrite=no')];
                case 1:
                    response = _a.sent();
                    expect(response.text.toLowerCase()).toContain('please provide filename');
                    return [2 /*return*/];
            }
        });
    }); });
    it('respond with error saying that the width or height needs to have values!', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/images?filename=fjord.jpg&width=0&height=100&overwrite=no')];
                case 1:
                    response = _a.sent();
                    expect(response.text.toLowerCase()).toContain('please enter both width and height values');
                    return [2 /*return*/];
            }
        });
    }); });
    it('respond with successful that it created resized file!', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/images?filename=fjord.jpg&width=200&height=100&overwrite=no')];
                case 1:
                    response = _a.sent();
                    expect(response.header['content-type']).toEqual('image/jpeg');
                    return [2 /*return*/];
            }
        });
    }); });
    it('respond with successful that it created resized file WITH overwrite!', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/images?filename=fjord.jpg&width=200&height=100&overwrite=yes')];
                case 1:
                    response = _a.sent();
                    expect(response.header['content-type']).toEqual('image/jpeg');
                    return [2 /*return*/];
            }
        });
    }); });
});
