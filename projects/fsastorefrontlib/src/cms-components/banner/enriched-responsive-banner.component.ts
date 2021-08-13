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
  bannerClasses;
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
            const boxView = this.configStyles.textBoxType === 'box';
            this.bannerStyles = {
              margin: this.configStyles.textBoxMargin,
              padding: this.configStyles.textBoxPadding,
              'text-align': this.configStyles.textBoxTextPosition,
              'max-width': boxView ? this.configStyles.textBoxMaxWidth : '',
            };
            this.bannerClasses = this.getVerticalClass(this.configStyles);
            this.bannerClasses += boxView
              ? 'box ' + this.getHorizontalClass(this.configStyles)
              : 'enriched-banner-text-strip ';
          })
        )
        .subscribe()
    );
  }

  getHorizontalClass(config): string {
    if (
      config?.textBoxVerticalPosition !== 'middle' &&
      config?.textBoxHorizontalPosition === 'center'
    ) {
      return 'horizontal-center ';
    } else if (config?.textBoxHorizontalPosition === 'left') {
      return 'left ';
    }
    return 'right ';
  }

  getVerticalClass(config): string {
    if (
      config?.textBoxVerticalPosition === 'middle' &&
      config?.textBoxHorizontalPosition === 'center'
    ) {
      return 'absolute-center ';
    } else if (
      config?.textBoxVerticalPosition === 'middle' &&
      config?.textBoxHorizontalPosition !== 'center'
    ) {
      return 'vertical-center ';
    } else if (config.textBoxVerticalPosition === 'top') {
      return 'top ';
    }
    return 'bottom ';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
