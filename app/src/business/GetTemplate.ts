import { aws_config } from '../aws/config';
import { SES } from '../aws/ses';
import { GetTemplateArgs, GetTemplateResponse } from '../types/GetTemplate';

export class GetTemplate {
  private ses: SES;

  constructor({ aws_params }: GetTemplateArgs) {
    this.ses = new SES(aws_config(aws_params));
  }

  async getTemplate(name: string): Promise<GetTemplateResponse> {
    const template = await this.ses.getTemplate({ TemplateName: name });
    const { Subject: subject, Html: html, Text: text } = template;
    return { subject, html, text };
  }
}
