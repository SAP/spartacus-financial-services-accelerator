import { ActiveCartService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from '@fsa/dynamicforms';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartPrefillResolver implements PrefillResolver {
  constructor(
    protected cartService: ActiveCartService,
    protected datePipe: DatePipe
  ) {}

  getFieldValue(fieldPath: string) {
    const attributes = fieldPath.split('.');
    let currentValue;
    return this.cartService.getActive().pipe(
      map(cart => {
        const serializedCart = Object.assign({}, cart);
        currentValue = this.serializeQuoteDetails(serializedCart);
        attributes.forEach(attribute => {
          if (this.isArrayAttribute(attribute)) {
            const attributeName = attribute.split('[')[0];
            const arrayPosition = attribute.split('[')[1].slice(0, 1);
            currentValue = currentValue[attributeName][arrayPosition];
          } else {
            currentValue = currentValue[attribute];
          }
        });
        currentValue = this.convertIfDate(currentValue);
        return currentValue;
      })
    );
  }

  convertIfDate(value) {
    const dateRegex = /^\d{1,2}\-\d{1,2}\-\d{4}$/;
    if (dateRegex.test(value)) {
      return this.datePipe.transform(value, 'yyyy-MM-dd');
    }
    return value;
  }

  isArrayAttribute(attribute: string) {
    if (attribute.indexOf('[') !== -1) {
      return true;
    }
    return false;
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
      insuredObject.insuredObjectItems &&
      insuredObject.insuredObjectItems.length > 0
    ) {
      const serializedItems = {};
      insuredObject.insuredObjectItems.forEach(item => {
        serializedItems[item.label] = item.value;
      });
      if (insuredObject.childInsuredObjectList) {
        insuredObject.childInsuredObjectList.insuredObjects.forEach(
          childObject => {
            this.serializeInsuredObject(childObject);
          }
        );
      }
      insuredObject.insuredObjectItems = serializedItems;
    }
    return insuredObject;
  }
}
