import { AwsParams } from './Aws';

export type GetTemplateArgs = {
  aws_params: AwsParams;
};

export type GetTemplateResponse = {
  subject: string;
  html: string;
  text: string;
};
