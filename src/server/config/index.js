const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';


export default {
  APP_NAME: process.env.APP_NAME || 'Project App',
  APP_HOST: process.env.APP_HOST || '0.0.0.0',
  APP_PORT: process.env.APP_PORT || 3000,
  GRAPHQL_URI: process.env.GRAPHQL_URI || 'http://localhost:4000/graphql',
  GRAPHQL_WITH_BATCH: process.env.GRAPHQL_WITH_BATCH || false,
  NODE_ENV,
  isDevelopment,
};
