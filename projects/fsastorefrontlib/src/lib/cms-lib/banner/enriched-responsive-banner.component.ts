import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CmsConfig, CmsResponsiveBannerComponentMedia } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsEnrichedResponsiveBannerComponent } from './../../occ-models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
   selector: 'fsa-enriched-responsive-banner',
   templateUrl: './enriched-responsive-banner.component.html',
   styleUrls: ['./enriched-responsive-banner.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnrichedResponsiveBannerComponent implements OnInit {
  constructor(
    public component: CmsComponentData<CmsEnrichedResponsiveBannerComponent>,
    protected config: CmsConfig
  ) {
  }

  component$;

  ngOnInit()
  {
    this.component$ = this.component.data$;
    this.component$.subscribe(comp => console.log(comp));
  }

  getComponentData(): Observable<CmsEnrichedResponsiveBannerComponent> {
    return this.component.data$;
  }

  getResponsiveImageUrl(): Observable<string> {
    return this.getComponentData().pipe(
      map(data =>
        EnrichedResponsiveBannerComponent.hasMedia(data)
          ? (<CmsResponsiveBannerComponentMedia>data.media).widescreen.url
          : ''
      )
    );
  }

  getResponsiveImageAbsoluteUrl(): Observable<string> {
    return this.getResponsiveImageUrl().pipe(this.convertToAbsoluteUrl);
  }

  private convertToAbsoluteUrl = map(url => this.getBaseUrl() + url);

  getBaseUrl(): string {
    return this.config.server.baseUrl || '';
  }

  static hasMedia(data): boolean {
    return !!data.media;
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
