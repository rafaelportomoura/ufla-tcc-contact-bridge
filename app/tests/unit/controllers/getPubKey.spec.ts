import { expect } from 'chai';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import sinon from 'sinon';
import { GetPubKey } from '../../../src/business/getPubKey';
import { getPubKey } from '../../../src/controllers/getPubKey';
import { PubKey } from '../../../src/types/Kms';
import { fastify_reply, fastify_request, fastify_stub } from '../../data/fastify';

describe('Controller -> GetPubKey', () => {
  let req: Partial<FastifyRequest>;
  let res: Record<keyof FastifyReply, sinon.SinonStub>;
  let get_pub_key_stub: sinon.SinonStub;

  beforeEach(() => {
    sinon.restore();
    req = fastify_request({});
    res = fastify_stub();

    get_pub_key_stub = sinon.stub(GetPubKey.prototype, 'get');
  });

  it('should return the public key and set status to 200', async () => {
    const pub_key: PubKey = { public_key: 'publicKey', encryption_algorithm: '', key_spec: '' };
    get_pub_key_stub.resolves(pub_key);

    const result = await getPubKey(req as FastifyRequest, fastify_reply(res));

    expect(result).to.deep.equal(pub_key);
    expect(res.status.calledWith(StatusCodes.OK)).equal(true);
  });
});
