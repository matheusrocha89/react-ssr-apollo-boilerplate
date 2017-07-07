import { createNetworkInterface } from 'react-apollo';

import { createHybridNetworkInterface } from './http-hybrid-network-interface';
import { GRAPHQL_URI, GRAPHQL_WITH_BATCH } from '../../server/config';


function createNormalNetworkInterface(opts) {
  const options = Object.assign({}, {
    uri: GRAPHQL_URI,
  }, opts);

  return createNetworkInterface(options);
}

function getNormalOrBatchInterface(opts) {
  return GRAPHQL_WITH_BATCH ?
    createHybridNetworkInterface(opts) :
    createNormalNetworkInterface(opts);
}


export default getNormalOrBatchInterface;
