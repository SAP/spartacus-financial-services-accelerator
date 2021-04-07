import { Injectable } from '@angular/core';

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
      currentValue = this.getValueForAttribute(attribute, currentValue);
      if (!currentValue) {
        break;
      }
    }
    return currentValue;
  }

  private static getValueForAttribute(attribute: string, objectValue) {
    if (attribute.indexOf('[') !== -1) {
      const attributeName = attribute.split('[')[0];
      const arrayPosition = attribute.split('[')[1].slice(0, 1);
      if (objectValue[attributeName]) {
        return objectValue[attributeName][arrayPosition];
      }
    }
    return objectValue[attribute];
  }
}
