import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Config, OccConfig } from '@spartacus/core';
import { DocumentOccModule } from './adapters';
import { AgentOccModule } from './adapters/agent/agent-occ.module';
import { BillingTimeOccModule } from './adapters/billing-time/billing-time-occ.module';
import { FsCartOccModule } from './adapters/cart/cart-occ.module';
import { ChangeRequestOccModule } from './adapters/change-request/change-request-occ.module';
import { CheckoutOccModule } from './adapters/checkout/checkout-occ.module';
import { ClaimOccModule } from './adapters/claim/claim-occ.module';
import { CsTicketOccModule } from './adapters/cs-ticket/cs-ticket-occ.module';
import { InboxOccModule } from './adapters/inbox/inbox-occ.module';
import { PolicyOccModule } from './adapters/policy/policy-occ.module';
import { ProductPricingOccModule } from './adapters/pricing/occ-product-pricing.module';
import { ProductAssignmentOccModule } from './adapters/product-assignment/product-assignment.module';
import { QuoteOccModule } from './adapters/quote/quote-occ.module';
import { UserRequestOccModule } from './adapters/user-request/user-request-occ.module';
import { FSUserOccModule } from './adapters/user/user-occ.module';
import { OccValueListService } from './services/value-list/occ-value-list.service';

@NgModule({
  imports: [
    AgentOccModule,
    BillingTimeOccModule,
    CheckoutOccModule,
    ProductPricingOccModule,
    InboxOccModule,
    FsCartOccModule,
    ProductAssignmentOccModule,
    CommonModule,
    HttpClientModule,
    ChangeRequestOccModule,
    ClaimOccModule,
    PolicyOccModule,
    QuoteOccModule,
    UserRequestOccModule,
    CsTicketOccModule,
    DocumentOccModule,
    FSUserOccModule,
  ],
  providers: [OccValueListService, { provide: OccConfig, useExisting: Config }],
})
export class OccModule {}
