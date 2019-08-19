import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PriceAttributeGroup, PricingData } from '../../models/pricing.interface';


@Injectable()
export class PricingService {

    constructor() { }

    pricingSource$ = new BehaviorSubject<PricingData>({
        priceAttributeGroups: []
    });

    pricingAttributesObservable = this.pricingSource$.asObservable();

    pricingAttributesData: PricingData = {
        priceAttributeGroups: []
    };

    buildPricingData(formData: { [name: string]: Object }) {
        Object.keys(formData).forEach(groupName => {
            const priceAttributeGroup: PriceAttributeGroup = {
                priceAttributes: [],
            };
            priceAttributeGroup.name = groupName;
            Object.keys(formData[groupName]).forEach(inputName => {
                priceAttributeGroup.priceAttributes.push({ 'key': inputName, 'value': formData[groupName][inputName] });
            });
            this.pricingAttributesData.priceAttributeGroups.push(priceAttributeGroup);
        });
        this.pricingSource$.next(this.pricingAttributesData);
    }

    getPricingAttributes(): PricingData {
        this.pricingAttributesObservable.subscribe(pricingAttributes => {
            this.pricingAttributesData = pricingAttributes;
        });
        return this.pricingAttributesData;
    }
}
