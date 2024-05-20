import { expect } from 'chai';
import { Validator } from '../../../src/adapters/validate';
import { ValidationError } from '../../../src/exceptions/ValidationError';
import { send_email_schema } from '../../../src/schemas/sendEmail';
import { EmailData } from '../../data/email';

describe('Adapters -> Validate', async () => {
  it('Should validate schema', async () => {
    const data = EmailData.sendEmail();
    const result = await Validator.validate(data, send_email_schema);
    expect(result).deep.eq(data);
  });
  it('Should not validate schema', async () => {
    const result = await Validator.validate({}, send_email_schema).catch((e) => e);
    expect(result).instanceOf(ValidationError);
    expect(result.issues).deep.eq({ template: ['Required'], to: ['Required'] });
  });
});
