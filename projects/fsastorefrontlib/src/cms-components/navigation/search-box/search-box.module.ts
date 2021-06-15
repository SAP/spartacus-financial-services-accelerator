import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { IconModule, MediaModule } from '@spartacus/storefront';
import { FSHighlightPipe } from '../../../shared/util/helpers/pipe/highlight.pipe';
import { FSSearchBoxComponent } from './search-box.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    IconModule,
    UrlModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SearchBoxComponent: {
          component: FSSearchBoxComponent,
        },
      },
    }),
  ],
  declarations: [FSSearchBoxComponent, FSHighlightPipe],
  entryComponents: [FSSearchBoxComponent],
  exports: [FSSearchBoxComponent],
})
export class FSSearchBoxModule {}
