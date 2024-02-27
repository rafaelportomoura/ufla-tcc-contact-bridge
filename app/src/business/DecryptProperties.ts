import { aws_config } from '../aws/config';
import { KMS } from '../aws/kms';
import { DecryptPropertiesArgs } from '../types/DecryptProperties';

export class DecryptProperties {
  private kms: KMS;

  constructor({ encrypt_key, aws_params }: DecryptPropertiesArgs) {
    this.kms = new KMS(encrypt_key, aws_config(aws_params));
  }

  async decrypt(properties: Record<string, string>): Promise<Record<string, string>> {
    const decrypted_properties: Record<string, string> = {};
    for await (const [key, value] of Object.entries(properties)) {
      decrypted_properties[key] = await this.kms.decrypt(value);
    }
    return decrypted_properties;
  }
}
