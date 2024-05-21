/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
import { SESv2Client } from '@aws-sdk/client-sesv2';
import { expect } from 'chai';
import Sinon from 'sinon';
import { SES } from '../../../src/aws/ses';

describe('AWS -> SES', () => {
  beforeEach(Sinon.restore);
  it('Should send email', async () => {
    Sinon.stub(SESv2Client.prototype, 'send').resolves();
    const response = await new SES({}).sendEmail({} as any);
    expect(response).deep.eq(undefined);
  });
});
