import { isEmpty } from 'lodash';
import { aws_config } from '../aws/config';
import { SES } from '../aws/ses';
import { SendEmailArgs, SendEmailParams } from '../types/SendEmail';
import { DecryptProperties } from './DecryptProperties';

export class SendEmail {
  private ses: SES;

  private decrypt_properties: DecryptProperties;

  constructor({ aws_params, encrypt_key }: SendEmailArgs) {
    this.ses = new SES(aws_config(aws_params));
    this.decrypt_properties = new DecryptProperties({ encrypt_key, aws_params });
  }

  async sendEmail(params: SendEmailParams): Promise<void> {
    const properties = await this.decryptProperties(params);
    await this.ses.sendEmail({
      Destination: { ToAddresses: params.to },
      Content: {
        Template: {
          TemplateName: params.template,
          TemplateData: JSON.stringify(properties)
        }
      },
      FromEmailAddress: params.from
    });
  }

  async decryptProperties({ properties, encrypted_properties }: SendEmailParams): Promise<Record<string, string>> {
    if (isEmpty(encrypted_properties)) return properties;
    const decrypted = await this.decrypt_properties.decrypt(encrypted_properties);
    return { ...properties, ...decrypted };
  }
}
