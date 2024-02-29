import { SQSEvent } from 'aws-lambda';
import { Logger } from '../adapters/logger';
import { Validator } from '../adapters/validate';
import { aws_params } from '../aws/config';
import { SendEmail } from '../business/SendEmail';
import { CONFIGURATION } from '../constants/configuration';
import { send_email_schema } from '../schemas/sendEmail';

export async function sendEmail(event: SQSEvent): Promise<void> {
  const logger = Logger(CONFIGURATION.STAGE, CONFIGURATION.LOG_LEVEL);
  try {
    const { Records } = event;
    logger.info(Records, 'Event::');
    for (const record of Records) {
      const body = await Validator.validate(JSON.parse(record.body), send_email_schema);
      const business = new SendEmail({ aws_params: aws_params(), encrypt_key: CONFIGURATION.KEY_ARN });
      await business.sendEmail(body);
    }
  } catch (error) {
    logger.error(error, 'Error::');
    throw error;
  }
}
