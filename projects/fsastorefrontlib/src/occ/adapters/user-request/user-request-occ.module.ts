import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { UserRequestAdapter } from '../../../core/user-request/connectors';
import { OccUserRequestAdapter } from './occ-user-request.adapter';
import { defaultOccUserRequestConfig } from './default-occ-user-request-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: UserRequestAdapter,
      useClass: OccUserRequestAdapter,
    },
    provideConfig(defaultOccUserRequestConfig),
  ],
})
export class UserRequestOccModule {}
