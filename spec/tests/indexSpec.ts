import app from '../../src/server';
import supertest from 'supertest';
const filename_exist = 'encenadaport.jpg';
const filename_not_exist = 'whateveritis.jpg';
const resize_filename = 'encenadaport.jpg';

let width: number = 100;
let height: number = 100;
let overwrite: boolean = true;

const request = supertest(app);

describe('Testing Image Processor - API', function () {
  it('respond with get as / - status 200', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('respond with error saying that the filename is not found!', async () => {
    const response = await request.get(
      '/api/images?filename=test.jpg&width=100&height=100&overwrite=no'
    );
    expect(response.text.toLowerCase()).toContain('unable to process it');
  });

  it('respond with error saying that the filename is blank!', async () => {
    const response = await request.get(
      '/api/images?filename=&width=100&height=100&overwrite=no'
    );
    expect(response.text.toLowerCase()).toContain('please provide filename');
  });

  it('respond with error saying that the width or height needs to have values!', async () => {
    const response = await request.get(
      '/api/images?filename=fjord.jpg&width=0&height=100&overwrite=no'
    );
    expect(response.text.toLowerCase()).toContain(
      'please enter both width and height values'
    );
  });

  it('respond with successful that it created resized file!', async () => {
    const response = await request.get(
      '/api/images?filename=fjord.jpg&width=200&height=100&overwrite=no'
    );
    expect(response.header['content-type']).toEqual('image/jpeg');
  });

  it('respond with successful that it created resized file WITH overwrite!', async () => {
    const response = await request.get(
      '/api/images?filename=fjord.jpg&width=200&height=100&overwrite=yes'
    );
    expect(response.header['content-type']).toEqual('image/jpeg');
  });

});
