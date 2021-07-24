import server from './server';
import path from 'path';

const port = 3000;

server.listen(port, () => {
  console.log(`server started at http://localhost${port}`);
});
