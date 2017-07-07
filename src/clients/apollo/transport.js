import { createNetworkInterface } from 'react-apollo';

import { createHybridNetworkInterface } from './http-hybrid-network-interface';
import { GRAPHQL_URI, GRAPHQL_WITH_BATCH } from '../../server/config';


function createSimpleNetworkInterface(opts) {
  const options = Object.assign({}, {
    uri: GRAPHQL_URI,
  }, opts);

  return createNetworkInterface(options);
}

function getNormalOrBatchInterface(opts) {
  return GRAPHQL_WITH_BATCH ?
    createHybridNetworkInterface(opts) :
    createSimpleNetworkInterface(opts);
}


export default getNormalOrBatchInterface;
