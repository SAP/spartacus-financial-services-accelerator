import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountModule } from '../../../my-account/my-account.module';
import { PremiumCalendarPageLayoutComponent } from './premium-calendar-page-layout.component';

@NgModule({
  imports: [CommonModule, MyAccountModule],
  declarations: [PremiumCalendarPageLayoutComponent],
  exports: [PremiumCalendarPageLayoutComponent]
})
export class PremiumCalendarPageLayoutModule {}
