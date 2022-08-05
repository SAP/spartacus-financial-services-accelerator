import { Injectable } from '@angular/core';
import { PricingData } from '../../../occ/occ-models/form-pricing.interface';

@Injectable()
export class PricingService {
  buildPricingData(formData: { [name: string]: Object }): PricingData {
    const formDataKeys = Object.keys(formData);

    const pricingAttributesData: PricingData = {
      priceAttributeGroups: formDataKeys.map(formDataKey => ({
        name: formDataKey,
        priceAttributes: Object.keys(formData[formDataKey]).map(inputName => ({
          key: inputName,
          value: formData[formDataKey][inputName],
        })),
      })),
    };

    return pricingAttributesData;
  }

  buildPricingDataWithformDefinition(
    formData: { [name: string]: Object },
    formDefinition: { [name: string]: Object }
  ): PricingData {
    const formDataKeys = Object.keys(formData);

    const pricingAttributesData: PricingData = {
      priceAttributeGroups: formDataKeys.map(groupCode => {
        let groupIndex = Object.keys(formDefinition?.formGroups).findIndex(
          (group: any) =>
            formDefinition?.formGroups[group].groupCode === groupCode
        );

        return {
          name: groupCode,
          priceAttributes: Object.keys(formData[groupCode]).map(inputName => {
            let fieldIndex = Object.keys(
              formDefinition?.formGroups[groupIndex].fieldConfigs
            ).findIndex(
              (field: any) =>
                formDefinition?.formGroups[groupIndex].fieldConfigs[field]
                  .name === inputName
            );

            let field =
              formDefinition?.formGroups[groupIndex].fieldConfigs[fieldIndex];

            return {
              type: field?.fieldType,
              key: inputName,
              value: formData[groupCode][inputName],
            };
          }),
        };
      }),
    };

    return pricingAttributesData;
  }
}
