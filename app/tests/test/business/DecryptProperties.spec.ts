import { expect } from 'chai';
import { DecryptProperties } from '../../../src/business/DecryptProperties';

describe('decrypt_properties', () => {
  let decrypt_properties;

  beforeEach(() => {
    decrypt_properties = new DecryptProperties({
      encrypt_key: 'your-encrypt-key',
      aws_params: { region: 'your-aws-region' }
    });
  });

  it('should decrypt properties', async () => {
    const encrypted_properties = {
      property1: 'encrypted-value1',
      property2: 'encrypted-value2'
    };

    const decrypted_properties = await decrypt_properties.decrypt(encrypted_properties);

    expect(decrypted_properties).equal({
      property1: 'decrypted-value1',
      property2: 'decrypted-value2'
    });
  });

  it('should decrypt a single value', async () => {
    const encrypted_value = 'encrypted-value';

    const [key, decrypted_value] = await decrypt_properties.decryptValue('property', encrypted_value);

    expect(key).equal('property');
    expect(decrypted_value).equal('decrypted-value');
  });
});
