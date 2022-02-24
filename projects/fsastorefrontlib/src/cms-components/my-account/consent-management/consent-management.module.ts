import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConsentManagementModule, SpinnerModule } from '@spartacus/storefront';
import { I18nModule } from '@spartacus/core';
import { ConsentService } from '../../../core/my-account/facade/consent.service';
import { FSConsentManagementComponent } from './consent-management.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    SpinnerModule,
    ConsentManagementModule,
  ],
  declarations: [FSConsentManagementComponent],
  exports: [FSConsentManagementComponent],
  providers: [ConsentService],
})
export class FSConsentManagementModule {}
