import { z } from 'zod';
import { send_email_schema } from '../schemas/sendEmail';
import { AwsParams } from './Aws';

export type SendEmailArgs = {
  aws_params: AwsParams;
  encrypt_key: string;
};

export type SendEmailParams = z.infer<typeof send_email_schema>;
