import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Config, OccConfig } from '@spartacus/core';
import { OccClaimService } from './claim/claim.service';
import { OccQuoteService } from './quote/quote.service';
import { OccPolicyService } from './policy/policy.service';
import { OccInboxService } from './inbox/inbox.service';


@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccQuoteService,
    OccPolicyService,
    OccClaimService,
    OccInboxService,
    { provide: OccConfig, useExisting: Config }
  ]
})
export class OccModule {}
