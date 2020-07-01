import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from '@fsa/dynamicforms';
import { DatePipe } from '@angular/common';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import * as moment from 'moment';
import { FormsSharedService } from '../service/forms-shared.service';

@Injectable({
  providedIn: 'root',
})
export class CartPrefillResolver implements PrefillResolver {
  constructor(
    protected cartService: FSCartService,
    protected datePipe: DatePipe,
    protected formsSharedService: FormsSharedService
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
        currentValue = this.formsSharedService.convertIfDate(currentValue);
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

  serializeQuoteDetails(cart): any {
    if (cart && cart.insuranceQuote && cart.insuranceQuote) {
      const insuranceQuote = cart.insuranceQuote;
      if (insuranceQuote.quoteDetails && insuranceQuote.quoteDetails.entry) {
        const serilizedQuoteDetails = {};
        insuranceQuote.quoteDetails.entry.forEach(entry => {
          serilizedQuoteDetails[entry.key] = entry.value;
        });
        cart.insuranceQuote.quoteDetails = serilizedQuoteDetails;
      }
      if (
        insuranceQuote.insuredObjectList &&
        insuranceQuote.insuredObjectList.insuredObjects
      ) {
        const serializedInusredObjects = [];
        insuranceQuote.insuredObjectList.insuredObjects.forEach(
          insuredObject => {
            serializedInusredObjects.push(
              this.serializeInsuredObject(insuredObject)
            );
          }
        );
        cart.insuranceQuote.insuredObjectList.insuredObjects = serializedInusredObjects;
      }
    }
    return cart;
  }

  serializeInsuredObject(insuredObject) {
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
