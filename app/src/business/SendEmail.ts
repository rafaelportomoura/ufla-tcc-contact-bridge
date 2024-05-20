/* eslint-disable lines-between-class-members */
import { isEmpty } from 'lodash';
import { Logger } from '../adapters/logger';
import { SES } from '../aws/ses';
import { SendEmailArgs, SendEmailParams } from '../types/SendEmail';
import { DecryptProperties } from './DecryptProperties';

export class SendEmail {
  private ses: SES;
  private logger: Logger;
  private decrypt_properties: DecryptProperties;

  constructor({ ses, decrypt_properties, logger }: SendEmailArgs) {
    this.ses = ses;
    this.decrypt_properties = decrypt_properties;
    this.logger = logger;
  }

  async sendEmail(params: SendEmailParams): Promise<void> {
    this.logger.debug('SendEmail::', params);
    const properties = await this.decryptProperties(params);
    this.logger.debug('SendEmail::Properties', properties);
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

  async decryptProperties({
    properties,
    encrypted_properties
  }: SendEmailParams): Promise<Record<string, string> | undefined> {
    if (isEmpty(encrypted_properties)) return properties;
    const decrypted = await this.decrypt_properties.decrypt(encrypted_properties);
    return { ...properties, ...decrypted };
  }
}
