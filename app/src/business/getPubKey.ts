/* eslint-disable no-empty-function */
import { aws_config } from '../aws/config';
import { KMS } from '../aws/kms';
import { AwsParams } from '../types/Aws';
import { PubKey } from '../types/Kms';

export class GetPubKey {
  private kms: KMS;

  constructor(key_arn: string, config: AwsParams) {
    this.kms = new KMS(key_arn, aws_config(config));
  }

  get(): Promise<PubKey> {
    return this.kms.getPubKey();
  }
}
