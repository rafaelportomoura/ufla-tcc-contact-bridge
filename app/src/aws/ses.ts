import {
  EmailTemplateContent,
  GetEmailTemplateCommand,
  GetEmailTemplateCommandInput,
  ListEmailTemplatesCommand,
  ListEmailTemplatesCommandInput,
  ListEmailTemplatesCommandOutput,
  NotFoundException,
  SESv2Client,
  SESv2ClientConfig,
  SendEmailCommand,
  SendEmailCommandInput,
  SendEmailCommandOutput
} from '@aws-sdk/client-sesv2';
import { CODE_MESSAGES } from '../constants/codeMessages';
import { NotFoundError } from '../exceptions/NotFoundError';
import { ListTemplateRequest } from '../types/ListTemplate';

export class SES {
  private client: SESv2Client;

  constructor(config: SESv2ClientConfig) {
    this.client = new SESv2Client(config);
  }

  listTemplates(input: ListEmailTemplatesCommandInput = {}): Promise<ListEmailTemplatesCommandOutput> {
    return this.client.send(new ListEmailTemplatesCommand(input));
  }

  async listPaginatedTemplates(input: ListTemplateRequest): Promise<Required<ListEmailTemplatesCommandOutput>> {
    let page = 1;
    let next_token: string | undefined = '';
    do {
      const result = await this.listTemplates({ PageSize: input.size });
      if (page === input.page) return result as Required<ListEmailTemplatesCommandOutput>;
      page++;
      next_token = result.NextToken;
    } while (next_token);
    throw new NotFoundError(CODE_MESSAGES.PAGE_NOT_FOUND_ERROR);
  }

  async getTemplate(input: GetEmailTemplateCommandInput): Promise<Required<EmailTemplateContent>> {
    try {
      const response = await this.client.send(new GetEmailTemplateCommand(input));
      return response.TemplateContent as Required<EmailTemplateContent>;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundError(CODE_MESSAGES.NOT_FOUND_ERROR);
      }
      throw error;
    }
  }

  sendEmail(input: SendEmailCommandInput): Promise<SendEmailCommandOutput> {
    return this.client.send(new SendEmailCommand(input));
  }
}
