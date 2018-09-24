import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/typeDefs';
import { generateContext, IApolloCustomContext } from './generateContext';

const initApolloServer = async () => {
  /**
   * Configure the Apollo Server. This is the part responsible for receiving network
   * requests and handling them.
   */
  const server = new ApolloServer({
    context: (): Promise<IApolloCustomContext> => generateContext(),
    schema: makeExecutableSchema({ typeDefs, resolvers })
  });

  return server;
};

export default initApolloServer;
