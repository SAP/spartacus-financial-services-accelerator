import { NgModule } from '@angular/core';
import { QuotesModule } from './assets/quotes.module';
import { PoliciesModule } from './assets/policies.module';
import { ClaimsModule } from './assets/claims.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './assets/store/effects';
import { reducerProvider, reducerToken } from './assets/store/reducers';
import { PremiumCalendarModule } from './assets/premium-calendar.module';

@NgModule({
  imports: [
    QuotesModule,
    PoliciesModule,
    ClaimsModule,
    PremiumCalendarModule,
    StoreModule.forFeature('assets', reducerToken),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  exports: [QuotesModule, PoliciesModule, ClaimsModule, PremiumCalendarModule],
  providers: [reducerProvider]
})
export class MyAccountModule {
}
