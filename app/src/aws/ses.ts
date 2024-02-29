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

export class SES {
  private client: SESv2Client;

  constructor(config: SESv2ClientConfig) {
    this.client = new SESv2Client(config);
  }

  listTemplates(input: ListEmailTemplatesCommandInput = {}): Promise<ListEmailTemplatesCommandOutput> {
    return this.client.send(new ListEmailTemplatesCommand(input));
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
