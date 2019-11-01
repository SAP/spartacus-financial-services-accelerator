import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Config, OccConfig } from '@spartacus/core';
import { OccClaimService } from './services/claim/claim.service';

import { OccQuoteService } from './services/quote/quote.service';
import { OccPolicyService } from './services/policy/policy.service';
import { OccInboxService } from './services/inbox/inbox.service';

import { OccFSCartService } from './services/cart/fs-cart.service';
import { OccBillingTimeService } from './services/billing-time/billing-time.service';
import { OccFSCheckoutService } from './services/checkout/fs-checkout.service';
import { OccAgentService } from './services/agent/agent.service';
import { OccUserRequestService } from './services/user-request/user-request.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccAgentService,
    OccQuoteService,
    OccPolicyService,
    OccClaimService,
    OccInboxService,
    OccFSCartService,
    OccBillingTimeService,
    OccFSCheckoutService,
    OccUserRequestService,
    { provide: OccConfig, useExisting: Config },
  ],
})
export class OccModule {}
