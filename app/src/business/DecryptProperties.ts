/* eslint-disable lines-between-class-members */
import { Logger } from '../adapters/logger';
import { KMS } from '../aws/kms';
import { DecryptPropertiesArgs } from '../types/DecryptProperties';

export class DecryptProperties {
  private kms: KMS;
  private logger: Logger;

  constructor({ kms, logger }: DecryptPropertiesArgs) {
    this.kms = kms;
    this.logger = logger;
  }

  async decrypt(properties: Record<string, string>): Promise<Record<string, string>> {
    const promises: Promise<[string, string]>[] = [];
    for await (const [key, value] of Object.entries(properties)) {
      promises.push(this.decryptValue(key, value));
    }

    const result = await Promise.all(promises);

    return result.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Record<string, string>);
  }

  async decryptValue(key: string, encrypted: string): Promise<[string, string]> {
    const value = await this.kms.decrypt(encrypted);
    this.logger.debug('DecryptProperties::', key, value);
    return [key, value];
  }
}
