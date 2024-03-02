import { CONFIGURATION } from './configuration';

const prefix = (code: number) => `${CONFIGURATION.MICROSERVICE}-${String(code).padStart(4, '0')}`;

let n = 0;

export const CODE_MESSAGES = {
  INTERNAL_SERVER_ERROR: {
    code: prefix(n++),
    message: 'Internal Server Error!'
  },
  VALIDATION_ERROR: {
    code: prefix(n++),
    message: 'Validation Error!'
  }
} as const;
