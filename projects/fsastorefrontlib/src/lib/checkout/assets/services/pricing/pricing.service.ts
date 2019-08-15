import { Injectable } from '@angular/core';
import { PricingData, PricingAttributeGroup } from '../../models/pricing.interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Product, StateWithProduct, ProductSelectors, ProductActions } from '@spartacus/core';
import { select, Store } from '@ngrx/store';
import { tap, map, shareReplay } from 'rxjs/operators';
import * as fromActions from '../../../../checkout/assets/store/actions/index';

@Injectable()
export class PricingService {

    constructor(protected store: Store<StateWithProduct>) {}
    private products: { [code: string]: Observable<Product> } = {};

    _pricingSource = new BehaviorSubject<PricingData>({
        priceAttributeList: []
    });

    pricingAttributesObservable = this._pricingSource.asObservable();

    pricingAttributesData: PricingData = {
        priceAttributeList: []
    };

    buildPricingData(formData: { [name: string]: Object }): PricingData {
        Object.entries(formData).forEach(
            ([priceAttributesGroup, inputsObj]) => {
                const priceAttributeGroup: PricingAttributeGroup = {
                    priceAttributes: [],
                };
                priceAttributeGroup.priceAttributesGroup = priceAttributesGroup;
                Object.entries(inputsObj).forEach(([inputName, inputValue]) => {
                    priceAttributeGroup.priceAttributes.push({ 'key': inputName, 'value': inputValue });
                });
                this.pricingAttributesData.priceAttributeList.push(priceAttributeGroup);
            });
        return this.pricingAttributesData;
    }

    setPricingAttributes(priceData: PricingData) {
        this._pricingSource.next(priceData);
    }

    getPricingAttributes(): PricingData {
        this.pricingAttributesObservable.subscribe(pricingAttributes => {
            this.pricingAttributesData = pricingAttributes;
        })
        return this.pricingAttributesData;
    }

    getExtendedProductData(productCode: string, priceData: PricingData): Observable<Product> {
        if (!this.products[productCode]) {
          this.products[productCode] = this.store.pipe(
            select(ProductSelectors.getSelectedProductStateFactory(productCode)),
            tap(productState => {
              const attemptedLoad =
                productState.loading || productState.success || productState.error;
    
              if (!attemptedLoad) {
                this.store.dispatch(new fromActions.LoadExtendedProduct({
                    productCode: productCode,
                    priceData: priceData,
                  }));
              }
            }),
            map(productState => productState.value),
            shareReplay({ bufferSize: 1, refCount: true })
          );
        }
        return this.products[productCode];
      }
}
