/* eslint-disable no-console */

import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToStaticMarkup } from 'react-dom/server';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import mobile from 'is-mobile';

import { createApolloClient, getNetworkInterface } from '../../../clients/apollo';
import { isDevelopment } from '../../config';
import App from '../../../components/app';
import Html from '../../../components/html';


function getAssetsMap() {
  let assets = {};
  if (isDevelopment) {
    assets = {
      main: '/bundle.js',
    };
  }
  return assets;
}

function requestHandler(req, res) {
  const isMobile = mobile(req);
  const clientOptions = {
    ssrMode: true,
  };
  const networkInterface = getNetworkInterface({ req });
  const apolloClient = createApolloClient({
    req,
    clientOptions,
    networkInterface,
  });
  const assetsMap = getAssetsMap();
  const routerContext = {};

  const app = (
    <ApolloProvider client={apolloClient}>
      <StaticRouter location={req.url} context={routerContext}>
        <App isMobile={isMobile} />
      </StaticRouter>
    </ApolloProvider>
  );

  renderToStringWithData(app).then((content) => {
    const data = apolloClient.store.getState().apollo.data;
    const html = (
      <Html
        content={content}
        state={{ apollo: { data } }}
        assetsMap={assetsMap}
      />
    );
    res.status(200);
    res.send(`<DOCTYPE html>\n${renderToStaticMarkup(html)}`);
    res.end();
  }).catch((e) => {
    console.error('RENDERING ERROR', e);
    res.status(500);
    res.end(`An error ocurred. Stack trace: \n\n${e.stack}`);
  });
}

export default requestHandler;
