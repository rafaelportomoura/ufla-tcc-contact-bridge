import Sinon from 'sinon';
import { KMS } from '../../../src/aws/kms';
import { GetPubKey } from '../../../src/business/getPubKey';

describe('Business -> GetPubKey', async () => {
  beforeEach(Sinon.restore);
  const get_pub_key = new GetPubKey(new KMS('', {}));
  it('Should get pub key', async () => {
    const get_pub_key_stub = Sinon.stub(KMS.prototype, 'getPubKey').resolves();
    await get_pub_key.get();
    Sinon.assert.calledOnce(get_pub_key_stub);
  });
});
