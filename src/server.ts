import express from 'express';
import logger from './utilities/logger';
import routes from './routes/index';
import routeImage from './routes/api/images';

const app = express();

app.use(express.static('resize'));
app.use(logger);
app.use('/', routes);
app.use('/api', routes);
app.use('/api/images', routeImage);

export default app;
