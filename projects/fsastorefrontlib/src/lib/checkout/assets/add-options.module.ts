import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

import {ComponentsModule} from '@spartacus/storefront';
import {OccFSCartService} from '../../occ/cart/fscart.service';
import {AddOptionsComponent} from './components/add-options/add-options.component';
import {FSCartService} from './services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ComponentsModule,
    NgbTooltipModule
  ],
  declarations: [AddOptionsComponent],
  exports: [AddOptionsComponent],
  providers: [FSCartService, OccFSCartService]

})
export class AddOptionsModule {
}
