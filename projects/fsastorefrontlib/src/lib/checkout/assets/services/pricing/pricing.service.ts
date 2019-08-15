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
        Object.keys(formData).forEach(groupName => {
                const priceAttributeGroup: PricingAttributeGroup = {
                    priceAttributes: [],
                };
                priceAttributeGroup.priceAttributesGroup = groupName;
                Object.keys(formData[groupName]).forEach(inputName => {
                    priceAttributeGroup.priceAttributes.push({ 'key': inputName, 'value':  formData[groupName][inputName] });
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
