import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerModule, MediaModule } from '@spartacus/storefront';
import { I18nModule } from '@spartacus/core';
import { AddOptionsComponent } from './add-options.component';
import { FSCartService } from '../../../../core/checkout/services';
import { OccFSCartAdapter } from '../../../../occ/services/cart/occ-fs-cart.adapter';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    NgSelectModule,
    SpinnerModule,
    MediaModule,
    NgbTooltipModule,
  ],
  declarations: [AddOptionsComponent],
  exports: [AddOptionsComponent],
  providers: [FSCartService, OccFSCartAdapter],
})
export class AddOptionsModule {}
