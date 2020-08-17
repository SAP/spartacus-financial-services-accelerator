import { Injectable } from '@angular/core';
import * as clone from 'clone';
import { FSCart } from '../../../occ/occ-models/occ.models';

@Injectable()
export class FormsUtils {
  static convertIfDate(value) {
    const dateRegex = /^\d{1,2}\-\d{1,2}\-\d{4}$/;
    if (dateRegex.test(value)) {
      value = value.split('-').reverse().join('-');
    }
    return value;
  }
  static getValueByPath(fieldPath: string, object) {
    let currentValue = object;
    const attributes = fieldPath.split('.');
    for (const attribute of attributes) {
      currentValue = this.getValueForAttibute(attribute, currentValue);
      if (!currentValue) {
        break;
      }
    }
    return currentValue;
  }

  private static getValueForAttibute(attribute: string, objectValue) {
    if (attribute.indexOf('[') !== -1) {
      const attributeName = attribute.split('[')[0];
      const arrayPosition = attribute.split('[')[1].slice(0, 1);
      return objectValue[attributeName][arrayPosition];
    }
    return objectValue[attribute];
  }

  static serializeCartEntries(cart): any {
    let serializedFsCart: FSCart = clone(cart);
    serializedFsCart = this.serializeQuoteDetails(cart, serializedFsCart);
    serializedFsCart = this.serializeConfigurationInfos(cart, serializedFsCart);
    return serializedFsCart;
  }
  private static serializeQuoteDetails(cart, serializedFsCart) {
    if (cart?.insuranceQuote) {
      const insuranceQuote = cart.insuranceQuote;
      if (insuranceQuote.quoteDetails && insuranceQuote.quoteDetails?.entry) {
        const serilizedQuoteDetails = {};
        insuranceQuote.quoteDetails.entry.forEach(entry => {
          serilizedQuoteDetails[entry.key] = entry.value;
        });
        serializedFsCart.insuranceQuote.quoteDetails = serilizedQuoteDetails;
      }
      if (insuranceQuote?.insuredObjectList?.insuredObjects) {
        const serializedInusredObjects = [];
        insuranceQuote.insuredObjectList.insuredObjects.forEach(
          insuredObject => {
            serializedInusredObjects.push(
              FormsUtils.serializeInsuredObject(insuredObject)
            );
          }
        );
        serializedFsCart.insuranceQuote.insuredObjectList.insuredObjects = serializedInusredObjects;
      }
    }
    return serializedFsCart;
  }

  private static serializeConfigurationInfos(cart, serializedFsCart) {
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
      serializedFsCart.entries[0].configurationInfos[0].configurationValues = serilizedConfigurationValues;
    }
    return serializedFsCart;
  }

  private static serializeInsuredObject(insuredObject) {
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
