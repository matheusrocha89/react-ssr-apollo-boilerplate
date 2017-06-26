/* eslint-disable no-console */
require('babel-core/register');
require('babel-polyfill');
require('isomorphic-fetch');

require('./src/server')((app) => {
  const host = app.get('host');
  const port = app.get('port');
  const env = app.get('env');
  const appName = app.get('title');
  console.log(`${appName} is running on: ${host}:${port} in ${env} mode`);
});
