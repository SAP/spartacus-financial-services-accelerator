import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Config, OccConfig } from '@spartacus/core';

import { FSCartAdapter } from '../core/checkout/services/cart';
import { AgentAdapter } from '../core/agent/connectors';
import { OccAgentAdapter } from './adapters/agent/occ-agent.adapter';
import { PolicyAdapter } from '../core/my-account/services/policy';
import { OccPolicyAdapter } from './adapters/policy/occ-policy.adapter';
import { ClaimAdapter } from '../core/my-account/services/claim';
import { OccClaimAdapter } from './adapters/claim/occ-claim.adapter';
import { InboxAdapter } from '../core/my-account/services/inbox';
import { OccInboxAdapter } from './adapters/inbox/occ-inbox.adapter';
import { OccFSCartAdapter } from './adapters/cart/occ-fs-cart.adapter';
import { BillingTimeAdapter } from '../core/checkout/services/billing-time';
import { OccBillingTimeAdapter } from './adapters/billing-time/occ-billing-time.adapter';
import { OccFSCheckoutAdapter } from './adapters/checkout/occ-fs-checkout.adapter';
import { FSCheckoutAdapter } from '../core/checkout/connectors/fs-checkout.adapter';
import { ProductPricingAdapter } from '../core/checkout/services/pricing';
import { OccProductPricingAdapter } from './adapters/pricing/occ-product-pricing.adapter';
import { QuoteAdapter } from '../core/my-account/services/quote';
import { OccQuoteAdapter } from './adapters/quote/occ-quote.adapter';
import { UserRequestAdapter } from '../core/user-request/connectors';
import { OccUserRequestAdapter } from './adapters/user-request/occ-user-request.adapter';

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
      provide: FSCartAdapter,
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
  ],
})
export class OccModule {}
