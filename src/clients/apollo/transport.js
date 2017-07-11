import { createNetworkInterface } from 'react-apollo';
import { merge } from 'lodash';

import { createHybridNetworkInterface } from './http-hybrid-network-interface';
import { GRAPHQL_URI, GRAPHQL_WITH_BATCH } from '../../server/config';


function createSimpleNetworkInterface(opts = {}, headers = {}) {
  const richerOpts = merge({}, {
    uri: GRAPHQL_URI,
    opts: {
      headers,
    },
  }, opts);

  return createNetworkInterface(richerOpts);
}

function getNormalOrBatchInterface(opts = {}, headers = {}) {
  return GRAPHQL_WITH_BATCH ?
    createHybridNetworkInterface(opts, headers) :
    createSimpleNetworkInterface(opts, headers);
}


export default getNormalOrBatchInterface;
