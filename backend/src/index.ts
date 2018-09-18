import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import { generateContext, IApolloCustomContext } from './middleware/generateContext';

/**
 * Configure Mongoose database connection
 */

// Pull data from .env file and node process and make it available at run time
dotenv.config();
const { DB_USER, DB_PASS, DB_URL, NODE_ENV } = process.env;

/**
 * Defines which type of Promise interface Mongoose should use.
 * Because node supports promises natively now, we can use the global Promise object.
 *
 * You can find a crash course on promises here:
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises}
 */
mongoose.Promise = global.Promise;

// Connect Mongoose to our database server (the one defined in .env)
mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}`,
  {
    useNewUrlParser: true
  },
  err => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.error(
        `🚫 🚫 🚫 Mongoose couldn't connect to Database, error returned: ${err}`
      );
    }
  }
);

/**
 * Configure the Apollo Server. This is the part responsible for receiving network
 * requests and handling them.
 */
const server = new ApolloServer({
  context: (): Promise<IApolloCustomContext> => generateContext(),
  schema: makeExecutableSchema({ typeDefs, resolvers })
});

/**
 * Now that the server is set up and our database is connnected, let's start listening
 * for network requests
 */
server.listen().then(({ url }) => {
  if (NODE_ENV !== 'production') {
    // tslint:disable-next-line no-console
    console.log(`🚀  Server ready at ${url}`);
  }
});
