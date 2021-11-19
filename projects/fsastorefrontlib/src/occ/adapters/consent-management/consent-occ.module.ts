import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { ConsentAdapter } from '../../../core/my-account/connectors';
import { OccConsentAdapter } from './occ-consent.adapter';
import { defaultOccConsentConfig } from './default-occ-consent-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: ConsentAdapter,
      useClass: OccConsentAdapter,
    },
    provideConfig(defaultOccConsentConfig),
  ],
})
export class ConsentOccModule {}
