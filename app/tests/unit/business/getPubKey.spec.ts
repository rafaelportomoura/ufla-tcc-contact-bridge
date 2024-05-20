import { expect } from 'chai';
import sinon from 'sinon';
import { KMS } from '../../../src/aws/kms';
import { GetPubKey } from '../../../src/business/getPubKey';
import { PubKey } from '../../../src/types/Kms';

describe('Business -> GetPubKey', () => {
  let get_pub_key_service: GetPubKey;
  let kms_stub: sinon.SinonStub;

  beforeEach(() => {
    sinon.restore();
    kms_stub = sinon.stub(KMS.prototype, 'getPubKey');
    get_pub_key_service = new GetPubKey(new KMS('', {}));
  });

  it('should return the public key', async () => {
    const pub_key: PubKey = { public_key: 'publicKey', key_spec: '', encryption_algorithm: 'RSA' };
    kms_stub.resolves(pub_key);

    const result = await get_pub_key_service.get();

    expect(result).to.deep.equal(pub_key);
    expect(kms_stub.calledOnce).equal(true);
  });
});
