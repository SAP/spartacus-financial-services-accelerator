import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsTableComponent } from './assets-table.component';
import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, I18nModule, SpinnerModule],
  declarations: [AssetsTableComponent],
  exports: [AssetsTableComponent],
})
export class AssetsTableModule {}
