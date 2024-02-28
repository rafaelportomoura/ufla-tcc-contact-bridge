import { fromIni } from '@aws-sdk/credential-providers';
import { CONFIGURATION } from '../constants/configuration';
import { AwsParams, AwsParamsConstructor } from '../types/Aws';

export const aws_config = ({ region, profile }: AwsParams) => {
  const credentials = profile ? fromIni({ profile }) : undefined;
  return {
    region,
    credentials
  };
};

export const aws_params = (params: AwsParamsConstructor = {}) => ({
  region: params.region ?? CONFIGURATION.REGION,
  ...params
});
