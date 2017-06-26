import path from 'path';
import express from 'express';
import { createServer } from 'http';

import {
  NODE_ENV,
  APP_HOST,
  APP_PORT,
  APP_NAME,
} from './config';
import requestHandler from './middlewares/request-handler';


const isDevelopment = app => app.get('env') === 'development';

export default (callback) => {
  const app = express();
  app.set('env', NODE_ENV);
  app.set('host', APP_HOST);
  app.set('port', APP_PORT);
  app.set('title', APP_NAME);

  const server = createServer(app);

  if (isDevelopment(app)) {
    // eslint-disable-next-line global-require
    const webpackServer = require('../../webpack/dev-server.config.js');
    webpackServer(app);
  } else {
    app.use('/static', express.static(path.join(__dirname, '../../dist')));
  }

  app.use(requestHandler);

  server.listen(app.get('port'), () => callback(app));
};
