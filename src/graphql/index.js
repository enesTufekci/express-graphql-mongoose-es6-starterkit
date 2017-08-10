import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { Router } from 'express';

import schema from './schema';

import UserLoader from './loaders/user.loader';

const helperMiddleware = [
  bodyParser.json(),
  bodyParser.text({ type: 'application/graphql' }),
  (req, res, next) => {
    if (req.is('application/graphql')) {
      req.body = { query: req.body };
    }
    next();
  },
];

const graphqlRouter = Router();

graphqlRouter.use('/graphql',
  ...helperMiddleware,
  graphqlExpress({
    schema,
    graphiql: true,
    context: {
      UserLoader,
    },
  }));

graphqlRouter.use('/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }));

export default graphqlRouter;
