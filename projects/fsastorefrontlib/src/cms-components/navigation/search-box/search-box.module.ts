import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { FSCheckoutService } from '../../../core/checkout/facade';
import { IconModule, MediaModule } from '@spartacus/storefront';
import { FSHighlightPipe } from '../../../shared/util/helpers/pipe/highlight.pipe';
import { FSSearchBoxComponent } from './search-box.component';
import { OrderOccModule } from '@spartacus/order/occ';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    IconModule,
    UrlModule,
    I18nModule,
    OrderOccModule,
  ],
  providers: [
    FSCheckoutService,
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SearchBoxComponent: {
          component: FSSearchBoxComponent,
        },
      },
    }),
  ],
  declarations: [FSSearchBoxComponent, FSHighlightPipe],
  exports: [FSSearchBoxComponent, FSHighlightPipe],
})
export class FSSearchBoxModule {}
