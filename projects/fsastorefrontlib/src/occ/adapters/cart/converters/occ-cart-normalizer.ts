import { Converter } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { FSCart } from './../../../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class FSOccCartNormalizer implements Converter<any, FSCart> {
  convert(source: any, target?: FSCart): FSCart {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    this.serializeQuoteDetails(target);
    this.serializeConfigurationInfos(target);
    return target;
  }

  private serializeQuoteDetails(cart) {
    if (cart?.insuranceQuote) {
      const insuranceQuote = cart.insuranceQuote;
      if (insuranceQuote.quoteDetails?.entry) {
        const serilizedQuoteDetails = {};
        insuranceQuote.quoteDetails.entry.forEach(entry => {
          serilizedQuoteDetails[entry.key] = entry.value;
        });
        cart.insuranceQuote.quoteDetails = serilizedQuoteDetails;
      }
      if (insuranceQuote?.insuredObjectList?.insuredObjects) {
        const serializedInusredObjects = [];
        insuranceQuote.insuredObjectList.insuredObjects.forEach(
          insuredObject => {
            serializedInusredObjects.push(
              this.serializeInsuredObject(insuredObject)
            );
          }
        );
        cart.insuranceQuote.insuredObjectList.insuredObjects =
          serializedInusredObjects;
      }
    }
  }

  private serializeConfigurationInfos(cart) {
    if (
      cart?.entries[0]?.configurationInfos[0]?.configurationValues?.entry
        ?.length > 0
    ) {
      const serilizedConfigurationValues = {};
      cart.entries[0].configurationInfos[0].configurationValues.entry.forEach(
        entry => {
          serilizedConfigurationValues[entry.key] = entry.value;
        }
      );
      cart.entries[0].configurationInfos[0].configurationValues =
        serilizedConfigurationValues;
    }
  }

  private serializeInsuredObject(insuredObject) {
    if (insuredObject.insuredObjectItems) {
      insuredObject.insuredObjectItems.forEach(item => {
        insuredObject[item.label] = item.value;
      });
      if (insuredObject.childInsuredObjectList) {
        insuredObject.childInsuredObjectList.insuredObjects.forEach(
          childObject => {
            this.serializeInsuredObject(childObject);
          }
        );
      }
    }
    return insuredObject;
  }
}
