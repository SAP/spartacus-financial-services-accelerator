import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { PriceAttributeGroup, PricingData } from '../../../occ/occ-models/form-pricing.interface';

@Injectable()
export class PricingService {

  pricingData = new BehaviorSubject<PricingData>({});

  setPricingData(pricingData: PricingData) {
    this.pricingData.next(pricingData);
  }

  getPricingData(): Observable<PricingData> {
    return this.pricingData.asObservable();
  }

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
