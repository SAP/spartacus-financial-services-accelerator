import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ChangeRequestAdapter } from '../../../core/change-request/connectors';
import { OccChangeRequestAdapter } from './occ-change-request.adapter';
import { provideConfig } from '@spartacus/core';
import { defaultOccChangeRequestConfig } from './default-occ-change-request-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: ChangeRequestAdapter,
      useClass: OccChangeRequestAdapter,
    },
    provideConfig(defaultOccChangeRequestConfig),
  ],
})
export class ChangeRequestOccModule {}
