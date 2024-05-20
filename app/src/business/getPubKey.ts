/* eslint-disable no-empty-function */
import { KMS } from '../aws/kms';
import { PubKey } from '../types/Kms';

export class GetPubKey {
  private kms: KMS;

  constructor(kms: KMS) {
    this.kms = kms;
  }

  get(): Promise<PubKey> {
    return this.kms.getPubKey();
  }
}
