import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ClaimsModule } from './assets/claims.module';
import { InboxModule } from './assets/inbox.module';
import { PoliciesModule } from './assets/policies.module';
import { QuotesModule } from './assets/quotes.module';
import { effects } from './assets/store/effects';
import { reducerProvider, reducerToken } from './assets/store/reducers';

@NgModule({
  imports: [
    QuotesModule,
    PoliciesModule,
    ClaimsModule,
    InboxModule,
    StoreModule.forFeature('assets', reducerToken),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  exports: [QuotesModule, PoliciesModule, ClaimsModule, InboxModule],
  providers: [reducerProvider]
})
export class MyAccountModule {}
