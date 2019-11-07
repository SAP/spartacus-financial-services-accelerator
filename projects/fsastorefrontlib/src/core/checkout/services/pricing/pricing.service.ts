import { Injectable } from '@angular/core';
import {
  PricingData,
  PriceAttributeGroup,
} from '../../../../occ/occ-models/form-pricing.interface';

@Injectable()
export class PricingService {
  buildPricingData(formData: { [name: string]: Object }): PricingData {
    const pricingAttributesData: PricingData = {
      priceAttributeGroups: [],
    };
    Object.keys(formData).forEach(groupName => {
      const priceAttributeGroup: PriceAttributeGroup = {
        priceAttributes: [],
      };
      priceAttributeGroup.name = groupName;
      Object.keys(formData[groupName]).forEach(inputName => {
        priceAttributeGroup.priceAttributes.push({
          key: inputName,
          value: formData[groupName][inputName],
        });
      });
      pricingAttributesData.priceAttributeGroups.push(priceAttributeGroup);
    });
    return pricingAttributesData;
  }
}
