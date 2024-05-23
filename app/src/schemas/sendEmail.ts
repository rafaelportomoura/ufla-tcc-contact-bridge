import { z } from 'zod';
import { CONFIGURATION } from '../constants/configuration';

export const send_email_schema = z.object({
  from: z.string().email().default(CONFIGURATION.SES_DEFAULT_EMAIL),
  to: z.array(z.string().email()).min(1),
  template: z.string().min(1).max(128),
  encrypted_properties: z.record(z.string().min(1)).optional(),
  properties: z.record(z.string()).optional()
});
