import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class DateConfig {
  date?: {
    format?: string;
  };
}

declare module '@spartacus/core' {
  interface Config extends DateConfig {}
}
