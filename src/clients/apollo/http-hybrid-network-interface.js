/*
 * This is the same example on Apollo Docs. Credits to them :)
 */

import {
  createBatchingNetworkInterface,
  createNetworkInterface,
} from 'apollo-client';
import { merge } from 'lodash';

import { GRAPHQL_URI } from '../../server/config';


class HTTPHybridNetworkInterface {

  constructor(opts = {}, headers = {}) {
    const richerOpts = merge({}, {
      uri: GRAPHQL_URI,
      opts: {
        headers,
      },
    }, opts);

    this.batchedInterface = createBatchingNetworkInterface(richerOpts);
    this.networkInterface = createNetworkInterface(richerOpts);
  }

  query(request) {
    // eslint-disable-next-line no-underscore-dangle
    if (request.variables && request.variables.__disableBatch) {
      return this.networkInterface.query(request);
    }

    return this.batchedInterface.query(request);
  }

  use(middlewares) {
    this.networkInterface.use(middlewares);
    this.batchedInterface.use(middlewares);
    return this;
  }

  useAfter(afterwares) {
    this.networkInterface.useAfter(afterwares);
    this.batchedInterface.useAfter(afterwares);
    return this;
  }
}

function createHybridNetworkInterface(opts = {}, headers = {}) {
  return new HTTPHybridNetworkInterface(opts, headers);
}

export default {
  HTTPHybridNetworkInterface,
  createHybridNetworkInterface,
};
