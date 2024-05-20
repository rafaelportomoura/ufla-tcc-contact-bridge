/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import { SendEmailParams } from '../../src/types/SendEmail';

export class EmailData {
  static sendEmail(d?: Partial<SendEmailParams>): SendEmailParams {
    return {
      from: faker.internet.email(),
      to: [faker.internet.email()],
      template: faker.lorem.word(),
      properties: {
        [faker.lorem.word()]: faker.lorem.word()
      },
      encrypted_properties: {
        [faker.lorem.word()]: faker.lorem.word()
      },
      ...d
    };
  }
}
