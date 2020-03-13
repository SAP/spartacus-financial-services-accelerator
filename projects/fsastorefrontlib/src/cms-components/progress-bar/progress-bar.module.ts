import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule, UrlModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { FSProgressBarComponent } from './progress-bar.component';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, RouterModule],
  declarations: [FSProgressBarComponent],
  exports: [FSProgressBarComponent],
  entryComponents: [FSProgressBarComponent],
})
export class FSProgressBarModule {}
