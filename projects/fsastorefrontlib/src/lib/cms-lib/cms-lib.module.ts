import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';


@NgModule({
  imports: [
    AccountModule
  ],
  exports:[AccountModule]
})
export class CmsLibModule {}