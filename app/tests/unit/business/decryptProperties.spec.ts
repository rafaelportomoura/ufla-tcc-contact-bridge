import { expect } from 'chai';
import sinon from 'sinon';
import { Logger } from '../../../src/adapters/logger';
import { KMS } from '../../../src/aws/kms';
import { DecryptProperties } from '../../../src/business/DecryptProperties';
import { LoggerLevel } from '../../../src/constants/loggerLevel';

describe('Business -> DecryptProperties', () => {
  let business: DecryptProperties;
  let kms_stub: sinon.SinonStub;

  beforeEach(() => {
    sinon.restore();
    kms_stub = sinon.stub(KMS.prototype, 'decrypt');
    business = new DecryptProperties({ kms: new KMS('', {}), logger: new Logger(LoggerLevel.silent, '') });
  });

  describe('decrypt', () => {
    it('should decrypt all properties', async () => {
      const properties = {
        prop1: 'encrypted_value1',
        prop2: 'encrypted_value2'
      };
      const decrypted_values = {
        prop1: 'decrypted_value1',
        prop2: 'decrypted_value2'
      };

      kms_stub.withArgs('encrypted_value1').resolves('decrypted_value1');
      kms_stub.withArgs('encrypted_value2').resolves('decrypted_value2');

      const result = await business.decrypt(properties);

      expect(result).deep.equal(decrypted_values);
      expect(kms_stub.calledWith('encrypted_value1')).equal(true);
    });
  });

  describe('decryptValue', () => {
    it('should decrypt a single property value', async () => {
      const key = 'prop1';
      const encrypted_value = 'encrypted_value1';
      const decrypted_value = 'decrypted_value1';

      kms_stub.withArgs(encrypted_value).resolves(decrypted_value);

      const result = await business.decryptValue(key, encrypted_value);

      expect(result).deep.equal([key, decrypted_value]);
      expect(kms_stub.calledWith(encrypted_value)).equal(true);
    });
  });
});
