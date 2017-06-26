import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import mobile from 'is-mobile';

import App from '../components/app';
import { createApolloClient, getNetworkInterface } from '../clients/apollo';


const isMobile = mobile();

const clientOptions = {
  initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
  connectToDevTools: true,
};
const networkInterface = getNetworkInterface();
const apolloClient = createApolloClient({ clientOptions, networkInterface });

const appWrapper = (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App isMobile={isMobile} />
    </BrowserRouter>
  </ApolloProvider>
);

window.onload = () => {
  render(appWrapper, document.getElementById('root'));
};
