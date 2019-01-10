import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsProductFeature } from './../../occ-models/cms-component.models';

@Component({
    selector: 'fsa-product-feature',
    templateUrl: './product-feature-component.html',
    styleUrls: ['./product-feature-component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFeatureComponent implements OnInit {
    CmsComponent = Component;
    constructor(
        protected componentData: CmsComponentData<CmsProductFeature>,
    ) { }
    component$;
    ngOnInit() {
        this.component$ = this.componentData.data$;
        console.log(this.component$);
    }
}
