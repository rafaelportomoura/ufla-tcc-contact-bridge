import { SQSEvent } from 'aws-lambda';
import { Logger } from '../adapters/logger';
import { Validator } from '../adapters/validate';
import { aws_config, aws_params } from '../aws/config';
import { KMS } from '../aws/kms';
import { SES } from '../aws/ses';
import { SendEmail } from '../business/SendEmail';
import { CONFIGURATION } from '../constants/configuration';
import { send_email_schema } from '../schemas/sendEmail';
import { sqs_request_id } from '../utils/sqsId';
import { DecryptProperties } from './../business/DecryptProperties';

export async function sendEmail(event: SQSEvent): Promise<void> {
  const { Records } = event;
  const record = Records[0];
  const logger = new Logger(CONFIGURATION.LOG_LEVEL, sqs_request_id(record));
  logger.info('Event::', event);
  try {
    const body = await Validator.validate(JSON.parse(record.body), send_email_schema);
    const config = aws_config(aws_params(CONFIGURATION));
    const business = new SendEmail({
      ses: new SES(config),
      decrypt_properties: new DecryptProperties({
        kms: new KMS(CONFIGURATION.KEY_ARN, config),
        logger
      }),
      logger
    });
    await business.sendEmail(body);
    logger.info('Handler::Success');
  } catch (error) {
    logger.error('Handler', error.message, error);
    throw error;
  }
}
