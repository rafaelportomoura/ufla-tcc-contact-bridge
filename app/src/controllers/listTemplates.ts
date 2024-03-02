import { FastifyReply, FastifyRequest } from 'fastify';
import { Validator } from '../adapters/validate';
import { aws_params } from '../aws/config';
import { ListTemplate } from '../business/ListTemplate';
import { HTTP_STATUS_CODE } from '../constants/httpStatus';
import { list_template_schema } from '../schemas/listTemplate';
import { ListTemplateResponse } from '../types/ListTemplate';
import { decodeObject } from '../utils/uriDecodeComponent';

export async function listTemplate(req: FastifyRequest, res: FastifyReply): Promise<ListTemplateResponse> {
  const params = await Validator.validate(decodeObject(req.query), list_template_schema);
  const business = new ListTemplate({ aws_params: aws_params() });
  const response = await business.paginated(params);
  res.status(HTTP_STATUS_CODE.OK);

  return response;
}
