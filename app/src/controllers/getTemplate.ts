import { FastifyReply, FastifyRequest } from 'fastify';
import { Validator } from '../adapters/validate';
import { aws_params } from '../aws/config';
import { GetTemplate } from '../business/GetTemplate';
import { HTTP_STATUS_CODE } from '../constants/httpStatus';
import { get_template } from '../schemas/getTemplate';
import { GetTemplateResponse } from '../types/GetTemplate';
import { decodeObject } from '../utils/uriDecodeComponent';

export async function getTemplate(req: FastifyRequest, res: FastifyReply): Promise<GetTemplateResponse> {
  const { name } = await Validator.validate(decodeObject(req.params), get_template);
  const business = new GetTemplate({ aws_params: aws_params() });
  const response = await business.getTemplate(name);
  res.status(HTTP_STATUS_CODE.OK);

  return response;
}
