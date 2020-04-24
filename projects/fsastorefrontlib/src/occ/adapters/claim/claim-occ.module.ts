import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { ClaimAdapter } from '../../../core/my-account/connectors';
import { OccClaimAdapter } from './occ-claim.adapter';
import { defaultOccClaimConfig } from './default-occ-claim-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: ClaimAdapter,
      useClass: OccClaimAdapter,
    },
    provideConfig(defaultOccClaimConfig),
  ],
})
export class ClaimOccModule {}
