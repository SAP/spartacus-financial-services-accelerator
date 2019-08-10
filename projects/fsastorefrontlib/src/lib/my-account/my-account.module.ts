import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { I18nModule } from '@spartacus/core';

import { ClaimsModule } from './assets/claims.module';
import { InboxModule } from './assets/inbox.module';
import { QuotesModule } from './assets/quotes.module';
import { PoliciesModule } from './assets/policies.module';
import { PolicyDetailsModule } from './assets/policy-details.module';
import { PremiumCalendarModule } from './assets/premium-calendar.module';
import { effects } from './assets/store/effects/index';
import { reducerProvider, reducerToken } from './assets/store/reducers/index';
import { FSUpdateProfileModule } from './assets/components/update-profile/fs-update-profile.module';


@NgModule({
  imports: [
    ClaimsModule,
    I18nModule,
    QuotesModule,
    PoliciesModule,
    PolicyDetailsModule,
    PremiumCalendarModule,
    InboxModule,
    FSUpdateProfileModule,
    StoreModule.forFeature('assets', reducerToken),
    EffectsModule.forFeature(effects)
  ],
  exports: [ ClaimsModule, InboxModule, QuotesModule, PoliciesModule, PolicyDetailsModule, PremiumCalendarModule ],
  providers: [ reducerProvider ]
})
export class MyAccountModule {}
