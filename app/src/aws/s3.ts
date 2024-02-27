import {
  DeleteObjectCommand,
  GetObjectCommand,
  GetObjectCommandOutput,
  S3Client,
  S3ClientConfig
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { FastifyBaseLogger } from 'fastify';
import { Readable } from 'stream';
import { CODE_MESSAGES } from '../constants/codeMessages';
import { InternalServerError } from '../exceptions/InternalServerError';

export class S3 {
  private client: S3Client;

  constructor(
    config: S3ClientConfig,
    private logger: FastifyBaseLogger
  ) {
    this.client = new S3Client(config);
  }

  async get(bucket: string, key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key
    });

    const response = await this.client.send(command);
    const { Body: body } = response as { Body: Required<GetObjectCommandOutput['Body']> };

    if (body instanceof Readable) {
      return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        body.on('data', (chunk: Uint8Array) => chunks.push(chunk));
        body.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        body.on('error', reject);
      });
    }

    throw new InternalServerError(CODE_MESSAGES.CANT_READ_OBJECT);
  }

  async upload(bucket: string, key: string, body: Buffer): Promise<void> {
    const command = new Upload({
      client: this.client,
      params: {
        Bucket: bucket,
        Key: key,
        Body: body
      }
    });

    command.on('httpUploadProgress', (progress) => this.logger.debug(progress));

    await command.done();
  }

  async remove(bucket: string, key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key
    });
    await this.client.send(command);
  }
}
