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
        Object.keys(formData).forEach( groupName => {
            const priceAttributeGroup: PricingAttributeGroup = {
                attrributes: [],
            };
            priceAttributeGroup.groupName = groupName;
            Object.keys(formData[groupName]).forEach( inputName => {
                priceAttributeGroup.attrributes.push({'key': inputName, 'value': formData[groupName][inputName]});
            });
            this.pricingData.groups.push(priceAttributeGroup);
        });
    }
}
