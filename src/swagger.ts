import { config } from 'dotenv';

config();

const { PORT, BACKEND_URL } = process.env;

const doc = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Arvofinance payment service API',
    description: 'An Application to manage virtual wallets',
  },
  host: BACKEND_URL || `localhost:${PORT}`,
  basePath: '/',
  tags: [
    // Add tags here
  ],
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    // Add docs here
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      in: 'header',
      description: `Add token for authorization using the format Bearer (token)e.g.
        'Bearer eetelteouou1223424nkdnkdgndkg'`,
      name: 'Authorization',
    },
  },
  definitions: {},
};

export default doc;
