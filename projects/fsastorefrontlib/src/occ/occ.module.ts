import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Config, OccConfig, CartAdapter } from '@spartacus/core';

import { OccClaimAdapter } from './services/claim/occ-claim.adapter';
import { OccQuoteAdapter } from './services/quote/occ-quote.adapter';
import { OccPolicyAdapter } from './services/policy/occ-policy.adapter';
import { OccInboxAdapter } from './services/inbox/occ-inbox.adapter';
import { OccFSCartAdapter } from './services/cart/occ-fs-cart.adapter';
import { OccBillingTimeAdapter } from './services/billing-time/occ-billing-time.adapter';
import { OccFSCheckoutAdapter } from './services/checkout/occ-fs-checkout.adapter';
import { OccAgentAdapter } from './services/agent/occ-agent.adapter';
import { AgentAdapter } from './services/agent/agent.adapter';
import { PolicyAdapter } from './services/policy/policy.adapter';
import { ClaimAdapter } from './services/claim/claim.adapter';
import { InboxAdapter } from './services/inbox/inbox.adapter';
import { BillingTimeAdapter } from './services/billing-time/billing-time.adapter';
import { FSCheckoutAdapter } from './services/checkout/fs-checkout.adapter';
import { ProductPricingAdapter } from './services/pricing/product-pricing.adapter';
import { OccProductPricingAdapter } from './services/pricing/occ-product-pricing.adapter';
import { QuoteAdapter } from './services/quote/quote.adapter';
import { UserRequestAdapter } from './services/user-request/user-request.adapter';
import { OccUserRequestAdapter } from './services/user-request/occ-user-request.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: AgentAdapter,
      useClass: OccAgentAdapter,
    },
    {
      provide: PolicyAdapter,
      useClass: OccPolicyAdapter,
    },
    {
      provide: ClaimAdapter,
      useClass: OccClaimAdapter,
    },
    {
      provide: InboxAdapter,
      useClass: OccInboxAdapter,
    },
    {
      provide: CartAdapter,
      useClass: OccFSCartAdapter,
    },
    {
      provide: BillingTimeAdapter,
      useClass: OccBillingTimeAdapter,
    },
    {
      provide: FSCheckoutAdapter,
      useClass: OccFSCheckoutAdapter,
    },
    {
      provide: AgentAdapter,
      useClass: OccAgentAdapter,
    },
    {
      provide: ProductPricingAdapter,
      useClass: OccProductPricingAdapter,
    },
    {
      provide: QuoteAdapter,
      useClass: OccQuoteAdapter,
    },
    {
      provide: UserRequestAdapter,
      useClass: OccUserRequestAdapter,
    },
    { provide: OccConfig, useExisting: Config },
  ]
})
export class OccModule {}
