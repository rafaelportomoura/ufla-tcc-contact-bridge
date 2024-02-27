import { FastifyInstance, FastifyPluginOptions, FastifyRegisterOptions } from 'fastify';
import { getPubKey } from '../controllers/getPubKey';

export function router(server: FastifyInstance, _: FastifyRegisterOptions<FastifyPluginOptions>, done: () => void) {
  server.get('/pub-key', getPubKey);
  done();
}
