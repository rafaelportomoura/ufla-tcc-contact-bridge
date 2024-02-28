import { AwsParams } from './Aws';

export type SendEmailArgs = {
  aws_params: AwsParams;
  encrypt_key: string;
};

export type SendEmailParams = {
  to: string[];
  template: string;
  properties: Record<string, string>;
  encrypted_properties: Record<string, string>;
  from?: string;
};
