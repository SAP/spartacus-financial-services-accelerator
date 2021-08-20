import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsEnrichedResponsiveBannerComponent } from '../../occ/occ-models';

@Component({
  selector: 'cx-fs-enriched-responsive-banner',
  templateUrl: './enriched-responsive-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrichedResponsiveBannerComponent {
  constructor(
    public component: CmsComponentData<CmsEnrichedResponsiveBannerComponent>
  ) {}
}
