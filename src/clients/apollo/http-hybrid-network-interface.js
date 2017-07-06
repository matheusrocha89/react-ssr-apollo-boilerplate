import {
  createBatchingNetworkInterface,
  createNetworkInterface,
} from 'apollo-client';


class HTTPHybridNetworkInterface {

  constructor(opts) {
    this.batchedInterface = createBatchingNetworkInterface(opts);
    this.networkInterface = createNetworkInterface(opts);
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

function createHybridNetworkInterface(opts) {
  return new HTTPHybridNetworkInterface(opts);
}

export default {
  HTTPHybridNetworkInterface,
  createHybridNetworkInterface,
};
