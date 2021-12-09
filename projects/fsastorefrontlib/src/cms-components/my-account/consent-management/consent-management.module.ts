import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  ConsentManagementModule,
  MediaModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ConsentService } from 'projects/fsastorefrontlib/src/core/my-account/facade/consent.service';
import { FSConsentManagementComponent } from './consent-management.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    MediaModule,
    UrlModule,
    ConsentManagementModule,
  ],
  declarations: [FSConsentManagementComponent],
  exports: [FSConsentManagementComponent],
  providers: [ConsentService],
  entryComponents: [FSConsentManagementComponent],
})
export class FSConsentManagementModule {}
