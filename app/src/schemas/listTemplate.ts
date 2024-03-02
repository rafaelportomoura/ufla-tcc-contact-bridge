import { z } from 'zod';

export const list_template_schema = z.object({
  page: z.number().int().positive().default(1),
  size: z.number().int().positive().max(100).default(100)
});
