import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnrichedResponsiveBannerComponent } from './enriched-responsive-banner.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ EnrichedResponsiveBannerComponent],
  exports: [ EnrichedResponsiveBannerComponent],
  entryComponents: [ EnrichedResponsiveBannerComponent]
})
export class BannerModule { }