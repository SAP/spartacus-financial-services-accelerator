import { Injectable } from '@angular/core';
import { PricingData, PricingAttributeGroup } from '../../models/pricing.interface';

@Injectable()
export class PricingService  {

    constructor(
    ) { }

    pricingData: PricingData = {
        groups: []
    };

    buildPricingData(formData: {[name: string]: any}) {
        Object.entries(formData).forEach(
            ([groupName, inputsObj]) => {
            const priceAttributeGroup: PricingAttributeGroup = {
                attrributes: [],
            };
            priceAttributeGroup.groupName = groupName;
            Object.entries(inputsObj).forEach( ([inputName, inputValue]) => {
                priceAttributeGroup.attrributes.push({'key': inputName, 'value': inputValue});
            });
            this.pricingData.groups.push(priceAttributeGroup);
        });
        console.log(this.pricingData);
    }
}
