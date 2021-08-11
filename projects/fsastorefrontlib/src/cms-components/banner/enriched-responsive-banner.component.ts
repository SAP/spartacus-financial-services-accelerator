import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CmsEnrichedResponsiveBannerComponent } from '../../occ/occ-models';

@Component({
  selector: 'cx-fs-enriched-responsive-banner',
  templateUrl: './enriched-responsive-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrichedResponsiveBannerComponent implements OnInit, OnDestroy {
  configStyles;
  bannerStyles;
  private subscription = new Subscription();
  constructor(
    public component: CmsComponentData<CmsEnrichedResponsiveBannerComponent>
  ) {}
  ngOnInit() {
    this.subscription.add(
      this.component.data$
        .pipe(
          tap(data => {
            this.configStyles = JSON.parse(data.configStyles).config;
            this.bannerStyles = {
              margin: this.configStyles.textBoxMargin,
              padding: this.configStyles.textBoxPadding,
              'text-align': this.configStyles.textBoxTextPosition,
            };
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
