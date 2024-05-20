import { expect } from 'chai';
import sinon from 'sinon';
import { Logger } from '../../../src/adapters/logger';
import { KMS } from '../../../src/aws/kms';
import { SES } from '../../../src/aws/ses';
import { DecryptProperties } from '../../../src/business/DecryptProperties';
import { SendEmail } from '../../../src/business/SendEmail';
import { LoggerLevel } from '../../../src/constants/loggerLevel';
import { SendEmailArgs, SendEmailParams } from '../../../src/types/SendEmail';
import { EmailData } from '../../data/email';

describe('Business -> SendEmail', () => {
  let business: SendEmail;
  let ses_stub: sinon.SinonStub;
  let decrypt: sinon.SinonStub;

  beforeEach(() => {
    ses_stub = sinon.stub(SES.prototype, 'sendEmail');
    decrypt = sinon.stub(DecryptProperties.prototype, 'decrypt');
    const logger = new Logger(LoggerLevel.silent, '');
    const args: SendEmailArgs = {
      ses: new SES({}),
      decrypt_properties: new DecryptProperties({ kms: new KMS('', {}), logger }),
      logger
    };
    business = new SendEmail(args);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('sendEmail', () => {
    it('should send an email with decrypted properties', async () => {
      const params: SendEmailParams = EmailData.sendEmail();
      const decrypted_properties = { encryptedProp1: 'decryptedValue1' };
      decrypt.resolves(decrypted_properties);

      await business.sendEmail(params);

      expect(decrypt.calledOnceWith(params.encrypted_properties)).equal(true);
      expect(
        ses_stub.calledOnceWith({
          Destination: { ToAddresses: params.to },
          Content: {
            Template: {
              TemplateName: params.template,
              TemplateData: JSON.stringify({ ...params.properties, ...decrypted_properties })
            }
          },
          FromEmailAddress: params.from
        })
      ).equal(true);
    });

    it('should send an email with only provided properties when no encrypted properties', async () => {
      const params: SendEmailParams = {
        to: ['recipient@example.com'],
        from: 'sender@example.com',
        template: 'templateName',
        properties: { prop1: 'value1' }
      };

      await business.sendEmail(params);

      expect(decrypt.notCalled).equal(true);
      expect(
        ses_stub.calledOnceWith({
          Destination: { ToAddresses: params.to },
          Content: {
            Template: {
              TemplateName: params.template,
              TemplateData: JSON.stringify(params.properties)
            }
          },
          FromEmailAddress: params.from
        })
      ).equal(true);
    });
  });

  describe('decryptProperties', () => {
    it('should return combined properties with decrypted properties', async () => {
      const params: SendEmailParams = EmailData.sendEmail();
      const decrypted_properties = { encryptedProp1: 'decryptedValue1' };
      decrypt.resolves(decrypted_properties);

      const result = await business.decryptProperties(params);

      expect(result).deep.equal({ ...params.properties, ...decrypted_properties });
      expect(decrypt.calledOnceWith(params.encrypted_properties)).equal(true);
    });

    it('should return only provided properties when no encrypted properties', async () => {
      const params: SendEmailParams = EmailData.sendEmail({
        encrypted_properties: {}
      });

      const result = await business.decryptProperties(params);

      expect(result).deep.equal(params.properties);
      expect(decrypt.notCalled).equal(true);
    });

    it('should return undefined when no properties provided', async () => {
      const params: SendEmailParams = EmailData.sendEmail({
        properties: undefined,
        encrypted_properties: {}
      });

      const result = await business.decryptProperties(params);

      expect(result).equal(undefined);
      expect(decrypt.notCalled).equal(true);
    });
  });
});
