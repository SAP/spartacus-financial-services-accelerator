import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyAccountModule} from '../../../my-account/my-account.module';
import {ClaimsPageLayoutComponent} from "./claims-page-layout.component";

@NgModule({
  imports: [CommonModule, MyAccountModule],
  declarations: [ClaimsPageLayoutComponent],
  exports: [ClaimsPageLayoutComponent]
})
export class ClaimsPageLayoutModule {
}
