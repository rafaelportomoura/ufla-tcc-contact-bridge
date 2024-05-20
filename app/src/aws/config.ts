import { fromIni } from '@aws-sdk/credential-providers';
import { CONFIGURATION } from '../constants/configuration';
import { AwsParams } from '../types/Aws';

export const aws_config = ({ region, profile }: AwsParams) => {
  const credentials = profile ? fromIni({ profile }) : undefined;
  return {
    region,
    credentials
  };
};

export const aws_params = (config: Pick<typeof CONFIGURATION, 'REGION' | 'PROFILE' | 'STAGE'>) => ({
  region: config.REGION,
  profile: config.STAGE === 'development' ? config.PROFILE : undefined
});
