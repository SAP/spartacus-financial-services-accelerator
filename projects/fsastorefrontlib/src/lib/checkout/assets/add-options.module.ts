import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerModule } from '@spartacus/storefront';
import { I18nModule } from '@spartacus/core';
import { AddOptionsComponent } from './components/add-options/add-options.component';
import { FSCartService } from './services';
import { OccFSCartService } from 'projects/fsastorefrontlib/src/lib/occ/cart/fs-cart.service';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    NgbTooltipModule
  ],
  declarations: [AddOptionsComponent],
  exports: [AddOptionsComponent],
  providers: [FSCartService, OccFSCartService]

})
export class AddOptionsModule {
}
