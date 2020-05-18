import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AgentAdapter } from '../core/agent/connectors';
import { CartAdapter } from '../core/cart';
import { CheckoutAdapter } from '../core/checkout/connectors/checkout.adapter';
import { CsTicketAdapter } from '../core/cs-ticket/connectors/cs-ticket.adapter';
import { InboxAdapter } from '../core/my-account/connectors/inbox.adapter';
import { BillingTimeAdapter } from '../core/product-pricing/connectors/billing-time.adapter';
import { ProductPricingAdapter } from '../core/product-pricing/connectors/product-pricing.adapter';
import { OccAgentAdapter } from './adapters/agent/occ-agent.adapter';
import { OccBillingTimeAdapter } from './adapters/billing-time/occ-billing-time.adapter';
import { OccCartAdapter } from './adapters/cart/occ-cart.adapter';
import { OccCheckoutAdapter } from './adapters/checkout/occ-checkout.adapter';
import { OccCsTicketAdapter } from './adapters/cs-ticket/occ-cs-ticket.adapter';
import { OccInboxAdapter } from './adapters/inbox/occ-inbox.adapter';
import { OccProductPricingAdapter } from './adapters/pricing/occ-product-pricing.adapter';
import { OccProductAssignmentAdapter } from './adapters/product-assignment/occ-product-assignment.adapter';
import { ProductAssignmentAdapter } from '../core/product-assignment/connectors/product-assignment.adapter';
import { ChangeRequestOccModule } from './adapters/change-request/change-request-occ.module';
import { ClaimOccModule } from './adapters/claim/claim-occ.module';
import { PolicyOccModule } from './adapters/policy/policy-occ.module';
import { QuoteOccModule } from './adapters/quote/quote-occ.module';
import { UserRequestOccModule } from './adapters/user-request/user-request-occ.module';
import { Config, OccConfig, CartOccModule } from '@spartacus/core';
import { AgentOccModule } from './adapters/agent/agent-occ.module';
import { BillingTimeOccModule } from './adapters/billing-time/billing-time-occ.module';
import { FsCartOccModule } from './adapters/cart/cart-occ.module';
import { InboxOccModule } from './adapters/inbox/inbox-occ.module';
import { CheckoutOccModule } from './adapters/checkout/checkout-occ.module';
import { ProductPricingOccModule } from './adapters/pricing/occ-product-pricing.module';

@NgModule({
  imports: [
    AgentOccModule,
    BillingTimeOccModule,
    CartOccModule,
    CheckoutOccModule,
    ProductPricingOccModule,
    InboxOccModule,
    FsCartOccModule,
    CommonModule,
    HttpClientModule,
    ChangeRequestOccModule,
    ClaimOccModule,
    PolicyOccModule,
    QuoteOccModule,
    UserRequestOccModule,
  ],
  providers: [
    {
      provide: CsTicketAdapter,
      useClass: OccCsTicketAdapter,
    },
    {
      provide: ProductAssignmentAdapter,
      useClass: OccProductAssignmentAdapter,
    },
    { provide: OccConfig, useExisting: Config },
  ],
})
export class OccModule {}
