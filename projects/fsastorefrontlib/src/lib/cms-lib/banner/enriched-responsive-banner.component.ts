import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CmsConfig, CmsResponsiveBannerComponentMedia } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsEnrichedResponsiveBannerComponent } from './../../occ-models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
   selector: 'fsa-enriched-responsive-banner',
   templateUrl: './enriched-responsive-banner.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnrichedResponsiveBannerComponent {
  constructor(
    public component: CmsComponentData<CmsEnrichedResponsiveBannerComponent>,
    protected config: CmsConfig
  ) { }
}
