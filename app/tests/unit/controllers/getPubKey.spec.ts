import { expect } from 'chai';
import sinon from 'sinon';
import { GetPubKey } from '../../../src/business/getPubKey';
import { CODE_MESSAGES } from '../../../src/constants/codeMessages';
import { getPubKey } from '../../../src/controllers/getPubKey';
import { InternalServerError } from '../../../src/exceptions/InternalServerError';
import { fastify_reply, fastify_request, fastify_stub } from '../../data/fastify';

describe('Controller -> GetPubKey', async () => {
  let res: Record<string, sinon.SinonStub>;
  beforeEach(() => {
    sinon.restore();
    res = fastify_stub();
  });
  it('Should get pub key', async () => {
    sinon.stub(GetPubKey.prototype, 'get').resolves({
      public_key: 'pubKey',
      encryption_algorithm: 'RSA',
      key_spec: '2048'
    });
    const response = await getPubKey(fastify_request(), fastify_reply(res));
    expect(res.status.args).deep.eq([[200]]);
    expect(response).to.deep.equal({
      public_key: 'pubKey',
      encryption_algorithm: 'RSA',
      key_spec: '2048'
    });
  });
  it('Should not get pub key', async () => {
    sinon.stub(GetPubKey.prototype, 'get').rejects();
    const response = await getPubKey(fastify_request(), fastify_reply(res));
    expect(res.status.args).deep.eq([[500]]);
    expect(response).deep.equal(new InternalServerError(CODE_MESSAGES.INTERNAL_SERVER_ERROR).toJSON());
  });
});
