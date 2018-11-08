import { NgModule } from '@angular/core';
import { QuotesModule } from './applications/quotes.module';
import { PoliciesModule } from './applications/policies.module';
import { ClaimsModule } from './applications/claims.module';

@NgModule({
  imports: [QuotesModule, PoliciesModule, ClaimsModule],
  declarations: [],
  exports: [QuotesModule, PoliciesModule, ClaimsModule]
})
export class MyAccountModule {
}
