import { z } from 'zod';

export const get_template = z.object({
  name: z.string()
});
