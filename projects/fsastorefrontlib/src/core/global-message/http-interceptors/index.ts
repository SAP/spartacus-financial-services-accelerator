import { Provider } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { FSBadRequestHandler } from './handlers/bad-request/bad-request.handler';

export const errorHandlers: Provider[] = [
  {
    provide: HttpErrorHandler,
    useExisting: FSBadRequestHandler,
    multi: true,
  },
];
