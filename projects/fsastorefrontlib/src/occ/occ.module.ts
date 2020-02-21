import { OccFsCsTicketAdapter } from './adapters/cs-ticket/occ-cs-ticket.adapter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Config, OccConfig } from '@spartacus/core';

import { FSCartAdapter } from '../core/cart';
import { AgentAdapter } from '../core/agent/connectors';
import { OccAgentAdapter } from './adapters/agent/occ-agent.adapter';
import { PolicyAdapter } from '../core/my-account/connectors/policy.adapter';
import { OccPolicyAdapter } from './adapters/policy/occ-policy.adapter';
import { ClaimAdapter } from '../core/my-account/connectors';
import { OccClaimAdapter } from './adapters/claim/occ-claim.adapter';
import { InboxAdapter } from '../core/my-account/connectors/inbox.adapter';
import { OccInboxAdapter } from './adapters/inbox/occ-inbox.adapter';
import { OccFSCartAdapter } from './adapters/cart/occ-fs-cart.adapter';
import { BillingTimeAdapter } from '../core/product-pricing/connectors/billing-time.adapter';
import { OccBillingTimeAdapter } from './adapters/billing-time/occ-billing-time.adapter';
import { OccFSCheckoutAdapter } from './adapters/checkout/occ-fs-checkout.adapter';
import { FSCheckoutAdapter } from '../core/checkout/connectors/fs-checkout.adapter';
import { ProductPricingAdapter } from '../core/product-pricing/connectors/product-pricing.adapter';
import { OccProductPricingAdapter } from './adapters/pricing/occ-product-pricing.adapter';
import { QuoteAdapter } from '../core/my-account/connectors/quote.adapter';
import { OccQuoteAdapter } from './adapters/quote/occ-quote.adapter';
import { UserRequestAdapter } from '../core/user-request/connectors';
import { OccUserRequestAdapter } from './adapters/user-request/occ-user-request.adapter';
import { FSCsTicketAdapter } from '../core/cs-ticket/connectors/cs-ticket.adapter';
import { ChangeRequestAdapter } from '../core/change-request/connectors/change-request.adapter';
import { OccChangeRequestAdapter } from './adapters/change-request/occ-change-request.adapter';
import { OccFSProductAssignmentAdapter } from './adapters/product-assignment/occ-product-assignment.adapter';
import { FSProductAssignmentAdapter } from '../core';

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
    {
      provide: FSCsTicketAdapter,
      useClass: OccFsCsTicketAdapter,
    },
    {
      provide: ChangeRequestAdapter,
      useClass: OccChangeRequestAdapter,
    },
    {
      provide: FSProductAssignmentAdapter,
      useClass: OccFSProductAssignmentAdapter,
    },
    { provide: OccConfig, useExisting: Config },
  ],
})
export class OccModule {}
