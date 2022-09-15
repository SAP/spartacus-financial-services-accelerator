import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { MediaModule, SpinnerModule } from '@spartacus/storefront';
import { CartConnector } from '../../../../core/cart/connectors';
import { FSCartService } from '../../../../core/cart/facade';
import { AddOptionsComponent } from './add-options.component';
import { SortModule } from '../../../../shared/util/helpers/pipe/sort.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    NgSelectModule,
    SpinnerModule,
    MediaModule,
    SortModule,
    NgbTooltipModule,
  ],
  declarations: [AddOptionsComponent],
  exports: [AddOptionsComponent],
  providers: [FSCartService, CartConnector],
})
export class AddOptionsModule {}
