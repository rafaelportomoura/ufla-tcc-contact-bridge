import { z } from 'zod';

export const send_email_schema = z.object({
  from: z.string().email().optional(),
  to: z.array(z.string().email()).min(1),
  template: z.string().min(1).max(128),
  encrypted_properties: z.record(z.string().min(1)).optional(),
  properties: z.record(z.unknown()).optional()
});
