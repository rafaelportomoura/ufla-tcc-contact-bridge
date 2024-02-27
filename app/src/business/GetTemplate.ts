import { aws_config } from '../aws/config';
import { S3 } from '../aws/s3';
import { GetTemplateArgs } from '../types/GetTemplate';

export class GetTemplate {
  private s3: S3;

  constructor({ aws_params, logger }: GetTemplateArgs) {
    this.s3 = new S3(aws_config(aws_params), logger);
  }

  async getTemplate(bucket: string, key: string): Promise<string> {
    const buffer = await this.s3.get(bucket, key);
    return buffer.toString('utf-8');
  }
}
