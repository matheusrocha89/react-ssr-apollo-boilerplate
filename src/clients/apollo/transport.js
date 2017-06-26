import { createNetworkInterface } from 'react-apollo';

import { GRAPHQL_URI } from '../../config';


function getNetworkInterface({ req = {}, interfaceOptions = {}, interfaceMiddlewares = [] }) {
  const options = Object.assign({}, {
    uri: GRAPHQL_URI,
    opts: {
      credentials: 'include',
      headers: req.headers || {},
    },
  }, interfaceOptions);

  const networkInterface = createNetworkInterface(options);

  if (interfaceMiddlewares.length > 0) {
    networkInterface.use(interfaceMiddlewares);
  }

  return networkInterface;
}


export default getNetworkInterface;
