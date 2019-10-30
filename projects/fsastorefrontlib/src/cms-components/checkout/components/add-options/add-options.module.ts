import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerModule, MediaModule } from '@spartacus/storefront';
import { I18nModule } from '@spartacus/core';
import { AddOptionsComponent } from './add-options.component';
import { FSCartService } from '../../../../core/checkout/services';
import { OccFSCartService } from '../../../../occ/services/cart/fs-cart.service';

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
  providers: [FSCartService, OccFSCartService],
})
export class AddOptionsModule {}
