import { FastifyBaseLogger } from 'fastify';
import { AwsParams } from './Aws';

export type GetTemplateArgs = {
  aws_params: AwsParams;
  logger: FastifyBaseLogger;
};
