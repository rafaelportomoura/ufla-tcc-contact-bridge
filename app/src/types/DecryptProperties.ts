import { Logger } from '../adapters/logger';
import { KMS } from '../aws/kms';

export type DecryptPropertiesArgs = {
  kms: KMS;
  logger: Logger;
};
