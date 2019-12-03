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
    Object.keys(formData).forEach(groupCode => {
      const priceAttributeGroup: PriceAttributeGroup = {
        priceAttributes: [],
      };
      priceAttributeGroup.name = groupCode;
      Object.keys(formData[groupCode]).forEach(inputName => {
        priceAttributeGroup.priceAttributes.push({
          key: inputName,
          value: formData[groupCode][inputName],
        });
      });
      pricingAttributesData.priceAttributeGroups.push(priceAttributeGroup);
    });
    return pricingAttributesData;
  }
}
