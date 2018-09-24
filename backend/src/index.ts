import dotenv from 'dotenv';
import createDBConnection from './lib/createDBConnection';
import initApolloServer from './lib/initApolloServer';

// Pull data from .env file and node process and make it available at run time
dotenv.config();
const { DB_USER, DB_PASS, DB_URL } = process.env;
const URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}`;

createDBConnection(URI).catch(err => {
  // tslint:disable no-console
  console.error('An error was encountered when trying to start the server:');
  console.error(err);
  // tslint:enable no-console
});

/**
 * Now that the server is set up and our database is connnected, let's start listening
 * for network requests
 */
initApolloServer().then(server => {
  server.listen().then(({ url }) => {
    if (process.env.NODE_ENV !== 'production') {
      // tslint:disable-next-line no-console
      console.log(`🚀  Server ready at ${url}`);
    }
  });
});
