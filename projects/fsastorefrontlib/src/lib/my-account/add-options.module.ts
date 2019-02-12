import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CartService } from '@spartacus/core';
import { AddOptionsComponent } from './assets/components/add-options/add-options.component';
import { ComponentsModule } from '@spartacus/storefront';
import { FSCartService } from 'projects/fsastorefrontlib/src/lib/my-account/assets/services';
import { StoreModule } from '@ngrx/store';
import { reducerCartProvider, reducerCartToken } from './assets/store/reducers';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ComponentsModule,
    StoreModule.forFeature('carts', reducerCartToken),
  ],
  declarations: [AddOptionsComponent],
  exports: [AddOptionsComponent],
  providers: [FSCartService,reducerCartProvider]
})
export class AddOptionsModule { }
