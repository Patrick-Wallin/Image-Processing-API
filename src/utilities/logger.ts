import express from 'express';
import winstonLogger from './winstonLogger';

const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  let url = req.path;
  winstonLogger.log({
    level: 'info',
    message: url,
  });
  next();
};

export default logger;
