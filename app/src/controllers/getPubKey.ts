import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { aws_config, aws_params } from '../aws/config';
import { KMS } from '../aws/kms';
import { GetPubKey } from '../business/getPubKey';
import { CONFIGURATION } from '../constants/configuration';
import { PubKey } from '../types/Kms';

export async function getPubKey(_: FastifyRequest, res: FastifyReply): Promise<PubKey> {
  const business = new GetPubKey(new KMS(CONFIGURATION.KEY_ARN, aws_config(aws_params(CONFIGURATION))));
  const response = await business.get();
  res.status(StatusCodes.OK);

  return response;
}
