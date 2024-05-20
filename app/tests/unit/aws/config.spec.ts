/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import { aws_config, aws_params } from '../../../src/aws/config';
import { CONFIGURATION } from '../../../src/constants/configuration';

describe('AWS -> Config', () => {
  it('Should get default config', () => {
    const params = aws_params(CONFIGURATION);
    const config = aws_config(params);
    expect(config.region).deep.eq('us-east-2');
    expect(config.credentials).not.equal(undefined);
  });
  it('Should get prod config', () => {
    (CONFIGURATION as Record<string, unknown>).STAGE = 'prod';
    const params = aws_params(CONFIGURATION);
    const config = aws_config(params);
    expect(config).deep.eq({
      region: CONFIGURATION.REGION,
      credentials: undefined
    });
    (CONFIGURATION as Record<string, unknown>).STAGE = 'development';
  });
});
