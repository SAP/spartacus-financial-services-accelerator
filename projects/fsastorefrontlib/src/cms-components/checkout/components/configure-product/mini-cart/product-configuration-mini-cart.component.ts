import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { PricingService } from './../../../../../core/product-pricing/facade/pricing.service';
import { FSProductService } from './../../../../../core/product-pricing/facade/product.service';
import { FSProduct } from './../../../../../occ/occ-models/occ.models';


@Component({
    selector: 'cx-fs-product-configuration-mini-cart',
    templateUrl: './product-configuration-mini-cart.component.html',
})
export class ProductConfigurationMiniCartComponent implements OnInit, OnDestroy {
    constructor(
        protected pricingService: PricingService,
        protected productService: FSProductService,
        protected currentProductService: CurrentProductService
    ) { }

    subscription = new Subscription();

    calculatedProductData = new BehaviorSubject<FSProduct>({});
    calculatedProductData$ = this.calculatedProductData.asObservable();
    pricingData = new BehaviorSubject<any>({});
    pricingData$ = this.pricingData.asObservable();


    product$: Observable<Product>;
    productId: string;

    ngOnInit() {
        this.product$ = this.currentProductService.getProduct().pipe(
            map(product => {
                if (product) {
                    this.productId = product.code;
                }
                return product;
            })
        );

        this.subscription.add(
            this.pricingService
                .getPricingData()
                .pipe(
                    switchMap(pricingData => {
                        if (this.productId && pricingData) {
                            return this.productService
                                .getCalculatedProductData(this.productId, pricingData)
                                .pipe(
                                    map(calculatedData =>
                                        this.calculatedProductData.next(calculatedData)
                                    )
                                );
                        }
                        return of(null);
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