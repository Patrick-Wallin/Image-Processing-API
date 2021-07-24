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
var imageprocessor_1 = require("../../../modules/imageprocessor/imageprocessor");
var fs_1 = __importDefault(require("fs"));
var filename_exist = 'C:/projects/udacity/projects/Image-Processing-API/src/assets/full/encenadaport.jpg';
var filename_not_existed = 'C:\\projects\\udacity\\projects\\Image-Processing-API\\src\\assets\\full\\noteventhere.jpg';
var resize_filename_1 = 'C:/projects/udacity/projects/Image-Processing-API/src/assets/resize/encenadaport-w200-h200.jpg';
var resize_filename_2 = 'C:\\projects\\udacity\\projects\\Image-Processing-API\\src\\assets\\resize\\noteventhere-w100-h100.jpg';
describe('Testing Image Processor', function () {
    var _this = this;
    var showFileDateTime = false;
    var message = '';
    var sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    var sleepForOneSecond = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(1000)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    beforeAll(function () {
        // Remove resized filenames before processing a test.
        fs_1.default.unlink(resize_filename_1, function (err) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err) {
                    console.log(err.message);
                }
                return [2 /*return*/];
            });
        }); });
        fs_1.default.unlink(resize_filename_2, function (err) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err) {
                    console.log(err.message);
                }
                return [2 /*return*/];
            });
        }); });
    });
    afterAll(function () {
        // Remove resized filenames before processing a test.
        fs_1.default.unlink(resize_filename_1, function (err) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err) {
                    console.log(err.message);
                }
                return [2 /*return*/];
            });
        }); });
        fs_1.default.unlink(resize_filename_2, function (err) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err) {
                    console.log(err.message);
                }
                return [2 /*return*/];
            });
        }); });
    });
    beforeEach(function () {
        showFileDateTime = false;
    });
    afterEach(function () {
        if (showFileDateTime) {
            fs_1.default.stat(resize_filename_1, function (err, stats) {
                if (err) {
                    console.log("Unable to check the date or time on this file: " + resize_filename_1);
                }
                else {
                    console.log("" + message);
                    console.log("File Data Last Modified: " + stats.mtime);
                }
            });
        }
    });
    it("expect resizeImage('','',0,0,false) to be returned in 'RESIZE_IMAGE.ERROR_FILENAME_EMPTY", function () { return __awaiter(_this, void 0, void 0, function () {
        var promise_resize_image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageprocessor_1.resizeImage('', '', 0, 0, false)];
                case 1:
                    promise_resize_image = _a.sent();
                    expect(promise_resize_image.valueOf()).toEqual(imageprocessor_1.RESIZE_IMAGE.ERROR_FILENAME_EMPTY);
                    return [2 /*return*/];
            }
        });
    }); });
    it('expect resizeImage(' +
        filename_exist +
        ",'',0,0,false) to be returned in 'RESIZE_IMAGE.ERROR_RESIZED_FILENAME_EMPTY'", function () { return __awaiter(_this, void 0, void 0, function () {
        var promise_resize_image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageprocessor_1.resizeImage(filename_exist, '', 0, 0, false)];
                case 1:
                    promise_resize_image = _a.sent();
                    expect(promise_resize_image.valueOf()).toEqual(imageprocessor_1.RESIZE_IMAGE.ERROR_RESIZED_FILENAME_EMPTY);
                    return [2 /*return*/];
            }
        });
    }); });
    it('expect resizeImage(' +
        filename_exist +
        ",'',100,100,false) to be returned in 'RESIZE_IMAGE.ERROR_RESIZED_FILENAME_EMPTY'", function () { return __awaiter(_this, void 0, void 0, function () {
        var promise_resize_image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageprocessor_1.resizeImage(filename_exist, '', 100, 100, false)];
                case 1:
                    promise_resize_image = _a.sent();
                    expect(promise_resize_image.valueOf()).toEqual(imageprocessor_1.RESIZE_IMAGE.ERROR_RESIZED_FILENAME_EMPTY);
                    return [2 /*return*/];
            }
        });
    }); });
    it('expect resizeImage(' +
        filename_exist +
        ',' +
        resize_filename_1 +
        ",0,0,false) to be returned in 'RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT'", function () { return __awaiter(_this, void 0, void 0, function () {
        var promise_resize_image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageprocessor_1.resizeImage(filename_exist, resize_filename_1, 0, 0, false)];
                case 1:
                    promise_resize_image = _a.sent();
                    expect(promise_resize_image.valueOf()).toEqual(imageprocessor_1.RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT);
                    return [2 /*return*/];
            }
        });
    }); });
    it('expect resizeImage(' +
        filename_exist +
        ',' +
        resize_filename_1 +
        ",100,0,false) to be returned in 'RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT'", function () { return __awaiter(_this, void 0, void 0, function () {
        var promise_resize_image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageprocessor_1.resizeImage(filename_exist, resize_filename_1, 100, 0, false)];
                case 1:
                    promise_resize_image = _a.sent();
                    expect(promise_resize_image.valueOf()).toEqual(imageprocessor_1.RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT);
                    return [2 /*return*/];
            }
        });
    }); });
    it('expect resizeImage(' +
        filename_exist +
        ',' +
        resize_filename_1 +
        ",0,100,false) to be returned in 'RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT'", function () { return __awaiter(_this, void 0, void 0, function () {
        var promise_resize_image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageprocessor_1.resizeImage(filename_exist, resize_filename_1, 0, 100, false)];
                case 1:
                    promise_resize_image = _a.sent();
                    expect(promise_resize_image.valueOf()).toEqual(imageprocessor_1.RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT);
                    return [2 /*return*/];
            }
        });
    }); });
    it('expect resizeImage(' +
        filename_not_existed +
        ',' +
        resize_filename_1 +
        ",100,100,false) to be returned in 'RESIZE_IMAGE.ERROR_FILENAME_NOT_EXIST'", function () { return __awaiter(_this, void 0, void 0, function () {
        var promise_resize_image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageprocessor_1.resizeImage(filename_not_existed, resize_filename_1, 100, 100, false)];
                case 1:
                    promise_resize_image = _a.sent();
                    expect(promise_resize_image.valueOf()).toEqual(imageprocessor_1.RESIZE_IMAGE.ERROR_FILENAME_NOT_EXIST);
                    return [2 /*return*/];
            }
        });
    }); });
    // Expect this to create resize_filename_1 file.
    it('expect resizeImage(' +
        filename_exist +
        ',' +
        resize_filename_1 +
        ",100,100,false) to be returned in 'RESIZE_IMAGE.ERROR_NONE'", function () { return __awaiter(_this, void 0, void 0, function () {
        var promise_resize_image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    showFileDateTime = true;
                    message = 'New created file';
                    return [4 /*yield*/, sleepForOneSecond()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, imageprocessor_1.resizeImage(filename_exist, resize_filename_1, 100, 100, false)];
                case 2:
                    promise_resize_image = _a.sent();
                    expect(promise_resize_image.valueOf()).toEqual(imageprocessor_1.RESIZE_IMAGE.ERROR_NONE);
                    return [2 /*return*/];
            }
        });
    }); });
    // Expect this to do nothing since resize_filename_1 file already to be existed.
    it('expect resizeImage(' +
        filename_exist +
        ',' +
        resize_filename_1 +
        ",100,100,false) to be returned in 'RESIZE_IMAGE.ERROR_NONE'", function () { return __awaiter(_this, void 0, void 0, function () {
        var promise_resize_image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    showFileDateTime = true;
                    message = 'Expect this to be same as previous test';
                    return [4 /*yield*/, sleepForOneSecond()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, imageprocessor_1.resizeImage(filename_exist, resize_filename_1, 100, 100, false)];
                case 2:
                    promise_resize_image = _a.sent();
                    expect(promise_resize_image.valueOf()).toEqual(imageprocessor_1.RESIZE_IMAGE.ERROR_NONE);
                    return [2 /*return*/];
            }
        });
    }); });
    // Expect this to recreate resize_filename_1 since resize_filename_1 file already to be existed and overwrite is true
    it('expect resizeImage(' +
        filename_exist +
        ',' +
        resize_filename_1 +
        ",100,100,true) to be returned in 'RESIZE_IMAGE.ERROR_NONE'", function () { return __awaiter(_this, void 0, void 0, function () {
        var promise_resize_image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    showFileDateTime = true;
                    message = 'Expect this to be different than previous test';
                    return [4 /*yield*/, sleepForOneSecond()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, imageprocessor_1.resizeImage(filename_exist, resize_filename_1, 100, 100, true)];
                case 2:
                    promise_resize_image = _a.sent();
                    expect(promise_resize_image.valueOf()).toEqual(imageprocessor_1.RESIZE_IMAGE.ERROR_NONE);
                    return [2 /*return*/];
            }
        });
    }); });
    // Expect this to create resize_filename_2 even the overwrite is true and resize_filename_2 does not exist.
    it('expect resizeImage(' +
        filename_exist +
        ',' +
        resize_filename_2 +
        ",100,100,true) to be returned in 'RESIZE_IMAGE.ERROR_NONE'", function () { return __awaiter(_this, void 0, void 0, function () {
        var promise_resize_image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageprocessor_1.resizeImage(filename_exist, resize_filename_2, 100, 100, true)];
                case 1:
                    promise_resize_image = _a.sent();
                    expect(promise_resize_image.valueOf()).toEqual(imageprocessor_1.RESIZE_IMAGE.ERROR_NONE);
                    return [2 /*return*/];
            }
        });
    }); });
});
