import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsConfig } from '@spartacus/core';
import { CmsComponentData, ResponsiveBannerComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsEnrichedResponsiveBannerComponent } from './../../';


@Component({
   selector: 'fsa-enriched-responsive-banner',
   templateUrl: './enriched-responsive-banner.component.html',
   styleUrls: ['./enriched-responsive-banner.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnrichedResponsiveBannerComponent extends ResponsiveBannerComponent {
  constructor(
    public component: CmsComponentData<CmsEnrichedResponsiveBannerComponent>,
    protected config: CmsConfig
  ) {
    super(component, config);
  }

  getHeadingText(): Observable<string> {
    return this.component.data$.pipe(
      map(data => {
        return data.headingText;
      })
    );
  }

  getStyledText(): Observable<string> {
    return this.component.data$.pipe(
      map(data => {
        return data.styledText;
      })
    );
  }

  getUrl(): Observable<string> {
    return this.component.data$.pipe(
      map(data => {
        return data.urlLink;
      })
    );
  }
}
