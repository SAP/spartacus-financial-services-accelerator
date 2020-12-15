import { FormDateConfig } from '@fsa/dynamicforms';
import { DateConfig } from './date-config';

export function fsDefaultDateFormatConfigFactory():
  | DateConfig
  | FormDateConfig {
  return {
    date: {
      format: 'dd/MM/yyyy',
    },
  };
}
