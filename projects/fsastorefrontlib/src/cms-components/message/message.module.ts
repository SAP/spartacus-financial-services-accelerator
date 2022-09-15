import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '@spartacus/storefront';
import { FSMessageComponent } from './message.component';

@NgModule({
  imports: [CommonModule, IconModule, BrowserAnimationsModule],
  declarations: [FSMessageComponent],
  exports: [FSMessageComponent],
})
export class FSMessageModule {}
