import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ResponsiveBannerComponent } from '@spartacus/storefront';

@Component({
    selector: 'fsa-enriched-responsive-banner',
    templateUrl: './enriched-responsive-banner.component.html',
    styleUrls: ['./enriched-responsive-banner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnrichedResponsiveBannerComponent extends ResponsiveBannerComponent {

}