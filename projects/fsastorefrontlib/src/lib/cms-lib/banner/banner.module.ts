import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnrichedResponsiveBannerComponent } from './enriched-responsive-banner.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        EnrichedResponsiveBannerComponent: { selector: 'fsa-enriched-responsive-banner' }
      }
    }),
  ],
  declarations: [EnrichedResponsiveBannerComponent],
  exports: [EnrichedResponsiveBannerComponent],
  entryComponents: [EnrichedResponsiveBannerComponent]
})
export class BannerModule { }
