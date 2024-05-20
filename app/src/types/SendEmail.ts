import { z } from 'zod';
import { Logger } from '../adapters/logger';
import { SES } from '../aws/ses';
import { DecryptProperties } from '../business/DecryptProperties';
import { send_email_schema } from '../schemas/sendEmail';

export type SendEmailArgs = {
  ses: SES;
  decrypt_properties: DecryptProperties;
  logger: Logger;
};

export type SendEmailParams = z.infer<typeof send_email_schema>;
