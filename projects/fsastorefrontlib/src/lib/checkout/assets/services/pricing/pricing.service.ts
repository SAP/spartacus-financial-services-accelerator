import { Injectable } from '@angular/core';
import { PricingData, PricingAttributeGroup } from '../../models/pricing.interface';
import { Subject } from 'rxjs';

@Injectable()
export class PricingService  {

    constructor( ) { }

    pricingAttributesData: PricingData = {
        groups: []
    };
    _pricingSource = new Subject<PricingData>();
    
    buildPricingData(formData: {[name: string]: Object}): PricingData {
        Object.entries(formData).forEach(
            ([groupName, inputsObj]) => {
            const priceAttributeGroup: PricingAttributeGroup = {
                attrributes: [],
            };
            priceAttributeGroup.groupName = groupName;
            Object.entries(inputsObj).forEach( ([inputName, inputValue]) => {
                priceAttributeGroup.attrributes.push({'key': inputName, 'value': inputValue});
            });
            this.pricingAttributesData.groups.push(priceAttributeGroup);
        });
        return this.pricingAttributesData;
    }

    setPricingAttributes(priceData: PricingData)
    {
        this._pricingSource.next(priceData);
    }
}
