import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {FsHttpInterceptor} from './fs-http-interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: FsHttpInterceptor,
    multi: true,
  },

];
