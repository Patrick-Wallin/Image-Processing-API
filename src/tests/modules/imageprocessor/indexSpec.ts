import {
  resizeImage,
  RESIZE_IMAGE,
} from '../../../modules/imageprocessor/imageprocessor';
import fs from 'fs';
import { doesNotMatch } from 'assert/strict';

const filename_exist =
  'C:/projects/udacity/projects/Image-Processing-API/src/assets/full/encenadaport.jpg';
const filename_not_existed =
  'C:\\projects\\udacity\\projects\\Image-Processing-API\\src\\assets\\full\\noteventhere.jpg';
const resize_filename_1 =
  'C:/projects/udacity/projects/Image-Processing-API/src/assets/resize/encenadaport-w200-h200.jpg';
const resize_filename_2 =
  'C:\\projects\\udacity\\projects\\Image-Processing-API\\src\\assets\\resize\\noteventhere-w100-h100.jpg';

describe('Testing Image Processor', function () {
  let showFileDateTime: boolean = false;
  let message: string = '';

  const sleep = (ms: number): Promise<any> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const sleepForOneSecond = async () => {
    await sleep(1000);
  };

  beforeAll(() => {
    // Remove resized filenames before processing a test.
    fs.unlink(resize_filename_1, async (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    fs.unlink(resize_filename_2, async (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  });

  afterAll(() => {
    // Remove resized filenames before processing a test.
    fs.unlink(resize_filename_1, async (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    fs.unlink(resize_filename_2, async (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  });

  beforeEach(() => {
    showFileDateTime = false;
  });

  afterEach(function () {
    if (showFileDateTime) {
      fs.stat(resize_filename_1, (err, stats) => {
        if (err) {
          console.log(
            `Unable to check the date or time on this file: ${resize_filename_1}`
          );
        } else {
          console.log(`${message}`);
          console.log(`File Data Last Modified: ${stats.mtime}`);
        }
      });
    }
  });

  it("expect resizeImage('','',0,0,false) to be returned in 'RESIZE_IMAGE.ERROR_FILENAME_EMPTY", async () => {
    const promise_resize_image = await resizeImage('', '', 0, 0, false);
    expect(promise_resize_image.valueOf()).toEqual(
      RESIZE_IMAGE.ERROR_FILENAME_EMPTY
    );
  });

  it(
    'expect resizeImage(' +
      filename_exist +
      ",'',0,0,false) to be returned in 'RESIZE_IMAGE.ERROR_RESIZED_FILENAME_EMPTY'",
    async () => {
      const promise_resize_image = await resizeImage(
        filename_exist,
        '',
        0,
        0,
        false
      );
      expect(promise_resize_image.valueOf()).toEqual(
        RESIZE_IMAGE.ERROR_RESIZED_FILENAME_EMPTY
      );
    }
  );

  it(
    'expect resizeImage(' +
      filename_exist +
      ",'',100,100,false) to be returned in 'RESIZE_IMAGE.ERROR_RESIZED_FILENAME_EMPTY'",
    async () => {
      const promise_resize_image = await resizeImage(
        filename_exist,
        '',
        100,
        100,
        false
      );
      expect(promise_resize_image.valueOf()).toEqual(
        RESIZE_IMAGE.ERROR_RESIZED_FILENAME_EMPTY
      );
    }
  );

  it(
    'expect resizeImage(' +
      filename_exist +
      ',' +
      resize_filename_1 +
      ",0,0,false) to be returned in 'RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT'",
    async () => {
      const promise_resize_image = await resizeImage(
        filename_exist,
        resize_filename_1,
        0,
        0,
        false
      );
      expect(promise_resize_image.valueOf()).toEqual(
        RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT
      );
    }
  );

  it(
    'expect resizeImage(' +
      filename_exist +
      ',' +
      resize_filename_1 +
      ",100,0,false) to be returned in 'RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT'",
    async () => {
      const promise_resize_image = await resizeImage(
        filename_exist,
        resize_filename_1,
        100,
        0,
        false
      );
      expect(promise_resize_image.valueOf()).toEqual(
        RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT
      );
    }
  );

  it(
    'expect resizeImage(' +
      filename_exist +
      ',' +
      resize_filename_1 +
      ",0,100,false) to be returned in 'RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT'",
    async () => {
      const promise_resize_image = await resizeImage(
        filename_exist,
        resize_filename_1,
        0,
        100,
        false
      );
      expect(promise_resize_image.valueOf()).toEqual(
        RESIZE_IMAGE.ERROR_WIDTH_OR_HEIGHT
      );
    }
  );

  it(
    'expect resizeImage(' +
      filename_not_existed +
      ',' +
      resize_filename_1 +
      ",100,100,false) to be returned in 'RESIZE_IMAGE.ERROR_FILENAME_NOT_EXIST'",
    async () => {
      const promise_resize_image = await resizeImage(
        filename_not_existed,
        resize_filename_1,
        100,
        100,
        false
      );
      expect(promise_resize_image.valueOf()).toEqual(
        RESIZE_IMAGE.ERROR_FILENAME_NOT_EXIST
      );
    }
  );

  // Expect this to create resize_filename_1 file.
  it(
    'expect resizeImage(' +
      filename_exist +
      ',' +
      resize_filename_1 +
      ",100,100,false) to be returned in 'RESIZE_IMAGE.ERROR_NONE'",
    async () => {
      showFileDateTime = true;
      message = 'New created file';
      await sleepForOneSecond();
      const promise_resize_image = await resizeImage(
        filename_exist,
        resize_filename_1,
        100,
        100,
        false
      );
      expect(promise_resize_image.valueOf()).toEqual(RESIZE_IMAGE.ERROR_NONE);
    }
  );

  // Expect this to do nothing since resize_filename_1 file already to be existed.
  it(
    'expect resizeImage(' +
      filename_exist +
      ',' +
      resize_filename_1 +
      ",100,100,false) to be returned in 'RESIZE_IMAGE.ERROR_NONE'",
    async () => {
      showFileDateTime = true;
      message = 'Expect this to be same as previous test';
      await sleepForOneSecond();
      const promise_resize_image = await resizeImage(
        filename_exist,
        resize_filename_1,
        100,
        100,
        false
      );
      expect(promise_resize_image.valueOf()).toEqual(RESIZE_IMAGE.ERROR_NONE);
    }
  );

  // Expect this to recreate resize_filename_1 since resize_filename_1 file already to be existed and overwrite is true
  it(
    'expect resizeImage(' +
      filename_exist +
      ',' +
      resize_filename_1 +
      ",100,100,true) to be returned in 'RESIZE_IMAGE.ERROR_NONE'",
    async () => {
      showFileDateTime = true;
      message = 'Expect this to be different than previous test';
      await sleepForOneSecond();
      const promise_resize_image = await resizeImage(
        filename_exist,
        resize_filename_1,
        100,
        100,
        true
      );
      expect(promise_resize_image.valueOf()).toEqual(RESIZE_IMAGE.ERROR_NONE);
    }
  );

  // Expect this to create resize_filename_2 even the overwrite is true and resize_filename_2 does not exist.
  it(
    'expect resizeImage(' +
      filename_exist +
      ',' +
      resize_filename_2 +
      ",100,100,true) to be returned in 'RESIZE_IMAGE.ERROR_NONE'",
    async () => {
      const promise_resize_image = await resizeImage(
        filename_exist,
        resize_filename_2,
        100,
        100,
        true
      );
      expect(promise_resize_image.valueOf()).toEqual(RESIZE_IMAGE.ERROR_NONE);
    }
  );
});
