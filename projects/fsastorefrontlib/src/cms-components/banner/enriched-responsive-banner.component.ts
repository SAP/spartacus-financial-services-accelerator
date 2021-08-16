import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  CmsEnrichedBannerConfig,
  CmsEnrichedResponsiveBannerComponent,
} from '../../occ/occ-models';

@Component({
  selector: 'cx-fs-enriched-responsive-banner',
  templateUrl: './enriched-responsive-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrichedResponsiveBannerComponent implements OnInit, OnDestroy {
  configStyles: CmsEnrichedBannerConfig;
  bannerStyles: { [key: string]: string };
  bannerClasses: string;
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
            const boxView = this.configStyles?.textBoxType === 'box';
            this.bannerStyles = {
              margin: this.configStyles?.textBoxMargin,
              padding: this.configStyles?.textBoxPadding,
              'text-align': this.configStyles?.textBoxTextPosition,
              'max-width': boxView ? this.configStyles?.textBoxMaxWidth : '',
            };
            this.bannerClasses = `${this.getVerticalClass(this.configStyles)} ${
              boxView
                ? 'box ' + this.getHorizontalClass(this.configStyles)
                : 'enriched-banner-text-strip '
            }`;
          })
        )
        .subscribe()
    );
  }

  getHorizontalClass(config): string {
    if (!this.verticalCenter(config) && this.horizontalCenter(config)) {
      return 'horizontal-center ';
    }
    return config?.textBoxHorizontalPosition + ' ';
  }

  getVerticalClass(config): string {
    if (this.verticalCenter(config)) {
      if (this.horizontalCenter(config)) {
        return 'absolute-center ';
      }
      return 'vertical-center ';
    }
    return config?.textBoxVerticalPosition + ' ';
  }

  verticalCenter(config): boolean {
    return config?.textBoxVerticalPosition === 'middle';
  }

  horizontalCenter(config): boolean {
    return config?.textBoxHorizontalPosition === 'center';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
