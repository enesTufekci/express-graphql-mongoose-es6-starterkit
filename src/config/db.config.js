import mongoose from 'mongoose';
import config from './app.config';

mongoose.createConnection(config.DB_HOST, {
  user: config.DB_USER,
  pass: config.DB_PASS,
  server: {
    socketOptions: {
      keepAlive: 1,
    },
  },
});

// Set mongoose promise as global promise(ES6)
mongoose.Promise = Promise;

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.info(`${collectionName}.${method}`, doc); // eslint-disable-line no-console
  });
}

mongoose.connection.on('error', () => {
  throw new Error('Unable to connect to database');
});

mongoose.connection.on('connected', () => {
  console.info('Database connection successful!'); // eslint-disable-line no-console
});

export default mongoose;
