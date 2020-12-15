import { DateConfig } from './date-config';

export function fsDefaultDateFormatConfigFactory(): DateConfig {
  return {
    date: {
      format: 'dd/MM/yyyy',
    },
  };
}
