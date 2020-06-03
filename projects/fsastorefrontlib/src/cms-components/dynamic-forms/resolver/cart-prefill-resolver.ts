import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from '@fsa/dynamicforms';
import { DatePipe } from '@angular/common';
import { FSCartService } from './../../../core/cart/facade/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartPrefillResolver implements PrefillResolver {
  constructor(
    protected cartService: FSCartService,
    protected datePipe: DatePipe
  ) {}

  getFieldValue(fieldPath: string) {
    const attributes = fieldPath.split('.');
    let currentValue;
    return this.cartService.getActive().pipe(
      map(cart => {
        currentValue = this.serializeQuoteDetails(cart);
        for (const attribute of attributes) {
          currentValue = this.getValueForAttibute(attribute, currentValue);
          if (!currentValue) {
            break;
          }
        }
        currentValue = this.convertIfDate(currentValue);
        return currentValue;
      })
    );
  }

  getValueForAttibute(attribute: string, objectValue) {
    if (attribute.indexOf('[') !== -1) {
      const attributeName = attribute.split('[')[0];
      const arrayPosition = attribute.split('[')[1].slice(0, 1);
      return objectValue[attributeName][arrayPosition];
    }
    return objectValue[attribute];
  }

  convertIfDate(value) {
    const dateRegex = /^\d{1,2}\-\d{1,2}\-\d{4}$/;
    if (dateRegex.test(value)) {
      return this.datePipe.transform(value, 'yyyy-MM-dd');
    }
    return value;
  }

  serializeQuoteDetails(cart): any {
    if (cart && cart.insuranceQuote && cart.insuranceQuote.quoteDetails) {
      if (cart.insuranceQuote.quoteDetails) {
        const quoteDetails = cart.insuranceQuote.quoteDetails;
        if (quoteDetails && quoteDetails.entry) {
          const serilizedQuoteDetails = {};
          cart.insuranceQuote.quoteDetails.entry.forEach(entry => {
            serilizedQuoteDetails[entry.key] = entry.value;
          });
          cart.insuranceQuote.quoteDetails = serilizedQuoteDetails;
        }
      }
      if (
        cart.insuranceQuote &&
        cart.insuranceQuote.insuredObjectList &&
        cart.insuranceQuote.insuredObjectList.insuredObjects
      ) {
        const inusredObjects = [];
        cart.insuranceQuote.insuredObjectList.insuredObjects.forEach(
          insuredObject => {
            inusredObjects.push(this.serializeInsuredObject(insuredObject));
          }
        );
        cart.insuranceQuote.insuredObjectList.insuredObjects = inusredObjects;
      }
    }
    return cart;
  }

  serializeInsuredObject(insuredObject) {
    if (
      insuredObject &&
      insuredObject.insuredObjectItems &&
      insuredObject.insuredObjectItems.length > 0
    ) {
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
