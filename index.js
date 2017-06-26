require('babel-core/register');

require('./src/server')((app) => {
  const host = app.get('host');
  const port = app.get('port');
  const env = app.get('env');
  const appName = app.get('title');
  console.log(`${appName} is running on: ${host}:${port} in ${env} mode`);
});
