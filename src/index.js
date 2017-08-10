import passport from 'passport';
import graphqlRoutes from './graphql';
import server from './config/server.config';
import config from './config/app.config';
import db from './config/db.config';
import auth from './auth';


server.get('/health-check', (req, res) => {
  res.send('Server is up and running!');
});

// Authentication routes
server.use('/auth', auth);

// Graphql routes
if (config.ENV === 'dev' || config.ENV === 'development') {
  server.use(graphqlRoutes);
} else {
  server.use(passport.authenticate('local', { session: false }), graphqlRoutes);
}

// Throw error if database connection fails
db.connection.on('error', () => {
  throw new Error('Unable to connect to database');
});

server.listen(config.PORT, () => {
  console.info(`Server started on port ${config.PORT} (${config.ENV})`); // eslint-disable-line no-console
});

export default server;
