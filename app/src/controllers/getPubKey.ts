import { FastifyReply, FastifyRequest } from 'fastify';
import { aws_params } from '../aws/config';
import { GetPubKey } from '../business/getPubKey';
import { CONFIGURATION } from '../constants/configuration';
import { HTTP_STATUS_CODE } from '../constants/httpStatus';
import { PubKey } from '../types/Kms';

export async function getPubKey(_: FastifyRequest, res: FastifyReply): Promise<PubKey> {
  const business = new GetPubKey(CONFIGURATION.KEY_ARN, aws_params());
  const response = await business.get();
  res.status(HTTP_STATUS_CODE.OK);

  return response;
}
