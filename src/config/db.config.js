import mongoose from 'mongoose';
import config from './app.config';

mongoose.connect(config.DB_HOST, {
  useMongoClient: true,
  keepAlive: 1,
  poolSize: 2,
});

mongoose.Promise = Promise;

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.info(`${collectionName}.${method}`, doc); // eslint-disable-line no-console
  });
}

mongoose.connection.on('connected', () => {
  console.info('Database connection successful!'); // eslint-disable-line no-console
});

export default mongoose;
