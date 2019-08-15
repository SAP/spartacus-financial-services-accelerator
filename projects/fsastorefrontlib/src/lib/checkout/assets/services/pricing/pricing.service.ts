import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { PricingData, PricingAttributeGroup } from '../../models/pricing.interface';

@Injectable()
export class PricingService {

    constructor() { }

    pricingSource$ = new BehaviorSubject<PricingData>({
        priceAttributeList: []
    });

    pricingAttributesObservable = this.pricingSource$.asObservable();

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

    setPricingAttributes(pricingData: PricingData) {
        this.pricingSource$.next(pricingData);
    }

    getPricingAttributes(): PricingData {
        this.pricingAttributesObservable.subscribe(pricingAttributes => {
            this.pricingAttributesData = pricingAttributes;
        });
        return this.pricingAttributesData;
    }
}
