import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

enum RESIZE_IMAGE {
  ERROR_NONE = 0,
  ERROR_FILENAME_NOT_EXIST = 1,
  ERROR_FILENAME_EMPTY = 2,
  ERROR_RESIZED_FILENAME_EMPTY = 3,
  ERROR_RESIZE_FILENAME_UNABLE_TO_BE_CREATED = 4,
  ERROR_RESIZE_FILENAME_UNABLE_TO_BE_REMOVED = 5,
  ERROR_WIDTH_OR_HEIGHT = 6,
}

const resizeImage = async (
  filename: string,
  resizedFilename: string,
  width: number,
  height: number,
  overwrite: boolean
): Promise<RESIZE_IMAGE> => {
  // validate on parameters
  if (filename.trim() === '') {
    return RESIZE_IMAGE.ERROR_FILENAME_EMPTY;
  }

  if (resizedFilename.trim() === '') {
    return RESIZE_IMAGE.ERROR_RESIZED_FILENAME_EMPTY;
  }

  if (width <= 0 || height <= 0) {
    return RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT;
  }

  let filename_extension: string = path.extname(filename).trim();
  let resized_filename_extension: string = path.extname(resizedFilename).trim();
  let success: RESIZE_IMAGE = RESIZE_IMAGE.ERROR_NONE;

  // Add default extension .jpg if no extension in the original filename or resized filename.
  if (filename_extension === '') {
    filename += '.jpg';
  }

  if (resized_filename_extension === '') {
    resizedFilename += '.jpg';
  }

  // Record whether original filename or resized filename exists.
  const fileNameExist = fs.promises
    .stat(filename)
    .then((stats) => {
      return stats.isFile();
    })
    .catch(() => false);

  const resizedFileNameExist = fs.promises
    .stat(resizedFilename)
    .then((stats) => {
      return stats.isFile();
    })
    .catch(() => false);

  // Check if original filename exists before any further processes.
  if (!(await fileNameExist).valueOf()) {
    return RESIZE_IMAGE.ERROR_FILENAME_NOT_EXIST;
  }

  if (overwrite) {
    if ((await resizedFileNameExist).valueOf()) {
      console.log("Test");
      if (width > 0 && height > 0) {
        try {
          await fs.promises.rm(resizedFilename);
          await sharp(filename)
            .resize(width, height)
            .toFile(resizedFilename)
            .then((info) => {
              success = RESIZE_IMAGE.ERROR_NONE;
            })
            .catch((err) => {
              success = RESIZE_IMAGE.ERROR_RESIZE_FILENAME_UNABLE_TO_BE_CREATED;
            });
        }catch(err) {
          success = RESIZE_IMAGE.ERROR_RESIZE_FILENAME_UNABLE_TO_BE_REMOVED;
        }
        /*
        try {
          fs.unlinkSync(resizedFilename);
          await sharp(filename)
            .resize(width, height)
            .toFile(resizedFilename)
            .then((info) => {
              success = RESIZE_IMAGE.ERROR_NONE;
            })
            .catch((err) => {
              success = RESIZE_IMAGE.ERROR_RESIZE_FILENAME_UNABLE_TO_BE_CREATED;
            });
        } catch (err) {
          success = RESIZE_IMAGE.ERROR_RESIZE_FILENAME_UNABLE_TO_BE_REMOVED;
        }
        */
      } else {
        success = RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT;
      }
    } else {
      if (width > 0 && height > 0) {
        await sharp(filename)
          .resize(width, height)
          .toFile(resizedFilename)
          .then((info) => {
            success = RESIZE_IMAGE.ERROR_NONE;
          })
          .catch((err) => {
            success = RESIZE_IMAGE.ERROR_RESIZE_FILENAME_UNABLE_TO_BE_CREATED;
          });
      } else {
        success = RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT;
      }
    }
  } else {
    if ((await resizedFileNameExist).valueOf()) {
      success = RESIZE_IMAGE.ERROR_NONE;
    } else {
      if (width > 0 && height > 0) {
        await sharp(filename)
          .resize(width, height)
          .toFile(resizedFilename)
          .then((info) => {
            success = RESIZE_IMAGE.ERROR_NONE;
          })
          .catch((err) => {
            success = RESIZE_IMAGE.ERROR_RESIZE_FILENAME_UNABLE_TO_BE_CREATED;
          });
      } else {
        success = RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT;
      }
    }
  }

  return success;
};

export { resizeImage, RESIZE_IMAGE };
