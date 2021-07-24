import express from 'express';
import path from 'path';
import fs from 'fs';
import {
  resizeImage,
  RESIZE_IMAGE,
} from '../../modules/imageprocessor/imageprocessor';
import winstonLogger from '../../utilities/winstonLogger';

const images = express.Router();

images.get('/', (req, res) => {
  let fileName: string = '';
  let resizedFileName: string = '';
  let width: number = 0;
  let height: number = 0;
  let overwrite: boolean = false;
  let error_message: string = '';
  let responseMessage: string = '';
  let logMessage: string = '';

  winstonLogger.log({
    level: 'info',
    message: req.originalUrl,
  });

  fileName =
    req.query.filename === undefined ? '' : (req.query.filename as string);
  if (req.query.width === undefined) {
    width = 0;
  } else {
    try {
      width = parseInt(req.query.width as string);
    } catch (err) {
      width = 0;
    }
  }

  if (req.query.height === undefined) {
    height = 0;
  } else {
    try {
      height = parseInt(req.query.height as string);
    } catch (err) {
      height = 0;
    }
  }

  overwrite =
    req.query.overwrite === undefined
      ? false
      : (req.query.overwrite as string) == 'yes'
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
    winstonLogger.log({
      level: 'info',
      message: logMessage,
    });
    res.send(responseMessage);
  } else {
    // Remove filename's extension if any
    fileName = path.parse(fileName).name.trim();
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

    let imgPathResizedFilename: string = `../assets/resize/${resizedFileName}`;

    // Add fileName to full path
    fileName = path.join(path.resolve('./'), `src/assets/full/${fileName}`);
    resizedFileName = path.join(
      path.resolve('./'),
      `src/assets/resize/${resizedFileName}`
    );

    resizeImage(fileName, resizedFileName, width, height, overwrite)
      .then((result) => {
        switch (result) {
          case RESIZE_IMAGE.ERROR_NONE:
            responseMessage = `<img src="${imgPathResizedFilename}"/>`;
            logMessage = `Successful. ${resizedFileName}`;
            break;
          case RESIZE_IMAGE.ERROR_FILENAME_EMPTY:
            responseMessage = `<p>The input of original filename is blank.  Please enter original filename to be processed.</p>`;
            logMessage = 'No filename provided';
            break;
          case RESIZE_IMAGE.ERROR_FILENAME_NOT_EXIST:
            responseMessage = `<p>${fileName} is not found.  Unable to process it.</p>`;
            logMessage = `${fileName} not found`;
            break;
          case RESIZE_IMAGE.ERROR_RESIZED_FILENAME_EMPTY:
            responseMessage = `<p>The input of resized filename is blank.  Please enter resized filename to be created.</p>`;
            logMessage = 'No resized filename provided';
            break;
          case RESIZE_IMAGE.ERROR_RESIZE_FILENAME_UNABLE_TO_BE_CREATED:
            responseMessage = `<p>Unable to create ${resizedFileName}.  Please try again.</p>`;
            logMessage = `Unable to create ${resizedFileName} `;
            break;
          case RESIZE_IMAGE.ERROR_RESIZE_FILENAME_UNABLE_TO_BE_REMOVED:
            responseMessage = `<p>Unable to overwrite the resized file since the file is unable to be removed.  Please try again.</p>`;
            logMessage = `Unable to remove ${resizedFileName}`;
            break;
          case RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT:
            responseMessage =
              '<p>Please enter greater than 0 on width and height.';
            logMessage = 'No width or height provided';
            break;
          default:
            responseMessage = `<p>Please contact us with the following information: ${fileName}, ${resizedFileName}, ${width}, ${height}, ${overwrite}`;
            logMessage = `Other than errors. Unknown. ${fileName}, ${resizedFileName}, ${width}, ${height}, ${overwrite}`;
            break;
        }
      })
      .catch((err) => {
        responseMessage = `<p>Please contact us with the following information: ${fileName}, ${resizedFileName}, ${width}, ${height}, ${overwrite}`;
        logMessage = `${err} ${fileName}, ${resizedFileName}, ${width}, ${height}, ${overwrite}`;
      })
      .finally(() => {
        winstonLogger.log({
          level: 'info',
          message: logMessage,
        });
        if (responseMessage.startsWith('<img')) {
          res.sendFile(resizedFileName);
        } else {
          res.send(responseMessage);
        }
      });
  }
});

export default images;
