import server from './config/server.config';
import config from './config/app.config';

server.get('/', (req, res) => {
  res.send('server is working!');
});

server.listen(config.PORT, () => {
  console.info(`Server started on port ${config.PORT} (${config.ENV})`); // eslint-disable-line no-console
});

export default server;
