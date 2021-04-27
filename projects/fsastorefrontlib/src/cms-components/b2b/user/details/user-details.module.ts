import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  CardModule,
  ToggleStatusModule,
} from '@spartacus/organization/administration/components';
import { FSUserDetailsComponent } from './user-details.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ToggleStatusModule,
  ],
  declarations: [FSUserDetailsComponent],
  exports: [FSUserDetailsComponent],
})
export class FSUserDetailsModule {}
