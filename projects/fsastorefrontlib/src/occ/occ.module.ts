import { QUOTE_NORMALIZER } from '../core/my-account/connectors/converters';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Config, OccConfig } from '@spartacus/core';
import { AgentAdapter } from '../core/agent/connectors';
import { CartAdapter } from '../core/cart';
import { ChangeRequestAdapter } from '../core/change-request/connectors/change-request.adapter';
import { CheckoutAdapter } from '../core/checkout/connectors/checkout.adapter';
import { CsTicketAdapter } from '../core/cs-ticket/connectors/cs-ticket.adapter';
import { ClaimAdapter } from '../core/my-account/connectors';
import { InboxAdapter } from '../core/my-account/connectors/inbox.adapter';
import { PolicyAdapter } from '../core/my-account/connectors/policy.adapter';
import { QuoteAdapter } from '../core/my-account/connectors/quote.adapter';
import { BillingTimeAdapter } from '../core/product-pricing/connectors/billing-time.adapter';
import { ProductPricingAdapter } from '../core/product-pricing/connectors/product-pricing.adapter';
import { UserRequestAdapter } from '../core/user-request/connectors';
import { OccAgentAdapter } from './adapters/agent/occ-agent.adapter';
import { OccBillingTimeAdapter } from './adapters/billing-time/occ-billing-time.adapter';
import { OccCartAdapter } from './adapters/cart/occ-cart.adapter';
import { OccChangeRequestAdapter } from './adapters/change-request/occ-change-request.adapter';
import { OccCheckoutAdapter } from './adapters/checkout/occ-checkout.adapter';
import { OccClaimAdapter } from './adapters/claim/occ-claim.adapter';
import { OccCsTicketAdapter } from './adapters/cs-ticket/occ-cs-ticket.adapter';
import { OccInboxAdapter } from './adapters/inbox/occ-inbox.adapter';
import { OccPolicyAdapter } from './adapters/policy/occ-policy.adapter';
import { OccProductPricingAdapter } from './adapters/pricing/occ-product-pricing.adapter';
import { OccProductAssignmentAdapter } from './adapters/product-assignment/occ-product-assignment.adapter';
import { OccQuoteAdapter } from './adapters/quote/occ-quote.adapter';
import { OccUserRequestAdapter } from './adapters/user-request/occ-user-request.adapter';
import { OccQuoteNormalizer } from './adapters/quote/converters/occ-quote-normalizer';
import { ProductAssignmentAdapter } from '../core/product-assignment/connectors/product-assignment.adapter';

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
      useClass: OccCartAdapter,
    },
    {
      provide: BillingTimeAdapter,
      useClass: OccBillingTimeAdapter,
    },
    {
      provide: CheckoutAdapter,
      useClass: OccCheckoutAdapter,
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
      provide: QUOTE_NORMALIZER,
      useExisting: OccQuoteNormalizer,
      multi: true,
    },
    {
      provide: UserRequestAdapter,
      useClass: OccUserRequestAdapter,
    },
    {
      provide: CsTicketAdapter,
      useClass: OccCsTicketAdapter,
    },
    {
      provide: ChangeRequestAdapter,
      useClass: OccChangeRequestAdapter,
    },
    {
      provide: ProductAssignmentAdapter,
      useClass: OccProductAssignmentAdapter,
    },
    { provide: OccConfig, useExisting: Config },
  ],
})
export class OccModule {}
