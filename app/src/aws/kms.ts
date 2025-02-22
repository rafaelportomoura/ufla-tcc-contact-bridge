/* eslint-disable no-empty-function */
import {
  DecryptCommand,
  DecryptRequest,
  GetPublicKeyCommand,
  InvalidCiphertextException,
  KMSClient,
  KMSClientConfig
} from '@aws-sdk/client-kms';
import { CODE_MESSAGES } from '../constants/codeMessages';
import { ENCRYPTION_ALGORITHM } from '../constants/kms';
import { BadRequestError } from '../exceptions/BadRequestError';
import { PubKey } from '../types/Kms';

export class KMS {
  private client: KMSClient;

  constructor(
    private key_arn: string,
    config: KMSClientConfig
  ) {
    this.client = new KMSClient(config);
  }

  async decrypt(value: string): Promise<string> {
    try {
      const input: DecryptRequest = {
        CiphertextBlob: Buffer.from(value, 'base64'),
        KeyId: this.key_arn,
        EncryptionAlgorithm: ENCRYPTION_ALGORITHM
      };

      const command = new DecryptCommand(input);

      const response = await this.client.send(command);

      const { Plaintext: plain_text } = response;

      return Buffer.from(plain_text as Uint8Array).toString('utf-8');
    } catch (error) {
      if (error instanceof InvalidCiphertextException) throw new BadRequestError(CODE_MESSAGES.INVALID_ENCRYPTION);
      throw error;
    }
  }

  async getPubKey(): Promise<PubKey> {
    const input = {
      KeyId: this.key_arn
    };
    const command = new GetPublicKeyCommand(input);
    const response = await this.client.send(command);

    return {
      key_spec: response.KeySpec,
      encryption_algorithm: ENCRYPTION_ALGORITHM,
      public_key: Buffer.from(response.PublicKey as Uint8Array).toString('base64')
    } as PubKey;
  }
}
