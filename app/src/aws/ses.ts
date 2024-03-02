import {
  SESv2Client,
  SESv2ClientConfig,
  SendEmailCommand,
  SendEmailCommandInput,
  SendEmailCommandOutput
} from '@aws-sdk/client-sesv2';

export class SES {
  private client: SESv2Client;

  constructor(config: SESv2ClientConfig) {
    this.client = new SESv2Client(config);
  }

  sendEmail(input: SendEmailCommandInput): Promise<SendEmailCommandOutput> {
    return this.client.send(new SendEmailCommand(input));
  }
}
