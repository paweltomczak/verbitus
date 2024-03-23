import { apolloServer, startServer } from '../../lib/apollo/apolloServer';
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
