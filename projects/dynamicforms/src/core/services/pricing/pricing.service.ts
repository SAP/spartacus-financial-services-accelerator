import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  PricingData,
  PriceAttributeGroup,
} from '../../models/form-pricing.interface';

@Injectable()
export class PricingService {
  pricingSource$ = new BehaviorSubject<PricingData>({});

  buildPricingData(formData: { [name: string]: Object }) {
    const pricingAttributesData: PricingData = {
      priceAttributeGroups: [],
    };
    Object.keys(formData).forEach(groupName => {
      if (groupName !== 'button') {
        const priceAttributeGroup: PriceAttributeGroup = {
          priceAttributes: [],
        };
        priceAttributeGroup.name = groupName;
        Object.keys(formData[groupName]).forEach(inputName => {
          if (groupName !== inputName && inputName !== 'submit') {
            priceAttributeGroup.priceAttributes.push({
              key: inputName,
              value: formData[groupName][inputName],
            });
          }
        });
        pricingAttributesData.priceAttributeGroups.push(priceAttributeGroup);
      }
    });
    this.pricingSource$.next(pricingAttributesData);
  }

  getPricingAttributes(): Observable<PricingData> {
    return this.pricingSource$.asObservable();
  }
}
