/* eslint-disable import/no-extraneous-dependencies, no-console */

import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import express from 'express';

import devConfig from './dev.config';


export default (app) => {
  const options = {
    publicPath: devConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    serverSideRender: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  };

  const compiler = webpack(devConfig);
  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
  }));
  app.use('/public', express.static(path.join(__dirname, '../src/public')));
};
