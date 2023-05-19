import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import routes from './routes/routes.js';

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.SERVER_PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`server running on ${server.info.uri}`);
};

init();
