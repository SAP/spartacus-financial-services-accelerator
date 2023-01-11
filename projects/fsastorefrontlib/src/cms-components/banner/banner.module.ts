import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnrichedResponsiveBannerComponent } from './enriched-responsive-banner.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        EnrichedResponsiveBannerComponent: {
          component: EnrichedResponsiveBannerComponent,
        },
      },
    }),
  ],
  declarations: [EnrichedResponsiveBannerComponent],
  exports: [EnrichedResponsiveBannerComponent],
})
export class BannerModule {}
