import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../graphql/schema';
import { resolvers } from '../graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({ schema });
const startServer = apolloServer.start();

module.exports = { apolloServer, startServer };
