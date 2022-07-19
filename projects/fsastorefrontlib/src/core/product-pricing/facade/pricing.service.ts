import { Injectable } from '@angular/core';
import {
  PriceAttributeGroup,
  PricingData,
} from '../../../occ/occ-models/form-pricing.interface';

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

  buildPricingDataWithformDefinition(formData: { [name: string]: Object }, formDefinition: { [name: string]: Object }): PricingData {
    const pricingAttributesData: PricingData = {
      priceAttributeGroups: [],
    };
    Object.keys(formData).forEach(groupCode => {
      let groupIndex = Object.keys(formDefinition?.formGroups).findIndex((group:any)=>{
        return formDefinition?.formGroups[group].groupCode == groupCode;
      });
      const priceAttributeGroup: PriceAttributeGroup = {
        priceAttributes: [],
      };
      priceAttributeGroup.name = groupCode;
      Object.keys(formData[groupCode]).forEach(inputName => {
        
        let fieldIndex = Object.keys(formDefinition?.formGroups[groupIndex].fieldConfigs).findIndex((field:any) =>{
          return formDefinition?.formGroups[groupIndex].fieldConfigs[field].name == inputName;
        })
        let field = formDefinition?.formGroups[groupIndex].fieldConfigs[fieldIndex];
        priceAttributeGroup.priceAttributes.push({
          type: field?.fieldType,
          key: inputName,
          value: formData[groupCode][inputName],
        });
      });
      pricingAttributesData.priceAttributeGroups.push(priceAttributeGroup);
    });
    return pricingAttributesData;
  }
}
