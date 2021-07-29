"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var imageprocessor_1 = require("../../modules/imageprocessor/imageprocessor");
var winstonLogger_1 = __importDefault(require("../../utilities/winstonLogger"));
var images = express_1.default.Router();
images.get('/', function (req, res) {
    var fileName = '';
    var resizedFileName = '';
    var width = 0;
    var height = 0;
    var overwrite = false;
    var error_message = '';
    var responseMessage = '';
    var logMessage = '';
    winstonLogger_1.default.log({
        level: 'info',
        message: req.originalUrl,
    });
    fileName =
        req.query.filename === undefined ? '' : req.query.filename;
    if (req.query.width === undefined) {
        width = 0;
    }
    else {
        try {
            width = parseInt(req.query.width);
        }
        catch (err) {
            width = 0;
        }
    }
    if (req.query.height === undefined) {
        height = 0;
    }
    else {
        try {
            height = parseInt(req.query.height);
        }
        catch (err) {
            height = 0;
        }
    }
    overwrite =
        req.query.overwrite === undefined
            ? false
            : req.query.overwrite == 'yes'
                ? true
                : false;
    if (fileName.length === 0 || !fileName.trim()) {
        error_message = '<p>Please provide filename to be resized.</p>';
        logMessage = 'No filename provided. ';
    }
    if (width == 0 || height == 0) {
        error_message += '<p>Please enter both width and height values.</p>';
        logMessage += 'No width or height provided.';
    }
    if (error_message.length > 0) {
        error_message +=
            '<p>Example: ' +
                req.protocol +
                '://' +
                req.get('host') +
                req.originalUrl.split('?').shift() +
                '?filename=image1.jpg&width=100&height=100&overwrite=yes</p>';
        responseMessage = error_message;
        winstonLogger_1.default.log({
            level: 'info',
            message: logMessage,
        });
        res.send(responseMessage);
    }
    else {
        // Remove filename's extension if any
        fileName = path_1.default.parse(fileName).name.trim();
        resizedFileName = fileName;
        // Produce new filename for resized file
        resizedFileName =
            fileName +
                '-w' +
                width.toString().trim() +
                '-h' +
                height.toString().trim();
        // Add '.jpg' to the filename since we put all images on our server (assets/full)
        fileName += '.jpg';
        resizedFileName += '.jpg';
        var imgPathResizedFilename_1 = "../assets/resize/" + resizedFileName;
        // Add fileName to full path
        fileName = path_1.default.join(path_1.default.resolve('./'), "src/assets/full/" + fileName);
        resizedFileName = path_1.default.join(path_1.default.resolve('./'), "src/assets/resize/" + resizedFileName);
        imageprocessor_1.resizeImage(fileName, resizedFileName, width, height, overwrite)
            .then(function (result) {
            switch (result) {
                case imageprocessor_1.RESIZE_IMAGE.ERROR_NONE:
                    responseMessage = "<img src=\"" + imgPathResizedFilename_1 + "\"/>";
                    logMessage = "Successful. " + resizedFileName;
                    break;
                case imageprocessor_1.RESIZE_IMAGE.ERROR_FILENAME_EMPTY:
                    responseMessage = "<p>The input of original filename is blank.  Please enter original filename to be processed.</p>";
                    logMessage = 'No filename provided';
                    break;
                case imageprocessor_1.RESIZE_IMAGE.ERROR_FILENAME_NOT_EXIST:
                    responseMessage = "<p>" + fileName + " is not found.  Unable to process it.</p>";
                    logMessage = fileName + " not found";
                    break;
                case imageprocessor_1.RESIZE_IMAGE.ERROR_RESIZED_FILENAME_EMPTY:
                    responseMessage = "<p>The input of resized filename is blank.  Please enter resized filename to be created.</p>";
                    logMessage = 'No resized filename provided';
                    break;
                case imageprocessor_1.RESIZE_IMAGE.ERROR_RESIZE_FILENAME_UNABLE_TO_BE_CREATED:
                    responseMessage = "<p>Unable to create " + resizedFileName + ".  Please try again.</p>";
                    logMessage = "Unable to create " + resizedFileName + " ";
                    break;
                case imageprocessor_1.RESIZE_IMAGE.ERROR_RESIZE_FILENAME_UNABLE_TO_BE_REMOVED:
                    responseMessage = "<p>Unable to overwrite the resized file since the file is unable to be removed.  Please try again.</p>";
                    logMessage = "Unable to remove " + resizedFileName;
                    break;
                case imageprocessor_1.RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT:
                    responseMessage =
                        '<p>Please enter greater than 0 on width and height.';
                    logMessage = 'No width or height provided';
                    break;
                default:
                    responseMessage = "<p>Please contact us with the following information: " + fileName + ", " + resizedFileName + ", " + width + ", " + height + ", " + overwrite;
                    logMessage = "Other than errors. Unknown. " + fileName + ", " + resizedFileName + ", " + width + ", " + height + ", " + overwrite;
                    break;
            }
        })
            .catch(function (err) {
            responseMessage = "<p>Please contact us with the following information: " + fileName + ", " + resizedFileName + ", " + width + ", " + height + ", " + overwrite;
            logMessage = err + " " + fileName + ", " + resizedFileName + ", " + width + ", " + height + ", " + overwrite;
        })
            .finally(function () {
            winstonLogger_1.default.log({
                level: 'info',
                message: logMessage,
            });
            if (responseMessage.startsWith('<img')) {
                res.sendFile(resizedFileName);
            }
            else {
                res.send(responseMessage);
            }
        });
    }
});
exports.default = images;
