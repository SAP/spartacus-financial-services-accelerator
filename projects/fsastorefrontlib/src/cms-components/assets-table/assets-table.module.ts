import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsTableComponent } from './assets-table.component';
import { I18nModule, UrlModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, I18nModule, SpinnerModule, UrlModule, RouterModule],
  declarations: [AssetsTableComponent],
  exports: [AssetsTableComponent],
})
export class AssetsTableModule {}
