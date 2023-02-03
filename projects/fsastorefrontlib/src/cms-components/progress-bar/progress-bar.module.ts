import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, RouterModule],
  declarations: [ProgressBarComponent],
  exports: [ProgressBarComponent],
})
export class ProgressBarModule {}
