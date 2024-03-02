import { EmailTemplateMetadata } from '@aws-sdk/client-sesv2';
import { z } from 'zod';
import { list_template_schema } from '../schemas/listTemplate';

export type ListTemplateRequest = z.infer<typeof list_template_schema>;

export type ListTemplateResponse = {
  templates: EmailTemplateMetadata[];
};
