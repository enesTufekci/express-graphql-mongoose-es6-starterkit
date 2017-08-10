import server from './config/server.config';
import config from './config/app.config';
import db from './config/db.config';

server.get('/', (req, res) => {
  res.send('server is working!');
});

// Check database connection
db.connection.on('error', () => {
  throw new Error('Unable to connect to database');
});

server.listen(config.PORT, () => {
  console.info(`Server started on port ${config.PORT} (${config.ENV})`); // eslint-disable-line no-console
});

export default server;
