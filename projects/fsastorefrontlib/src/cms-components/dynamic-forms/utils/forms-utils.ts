import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class FormsUtils {
  static convertIfDate(value) {
    const dateRegex = /^\d{1,2}\-\d{1,2}\-\d{4}$/;
    if (dateRegex.test(value)) {
      value = value
        .split('-')
        .reverse()
        .join('-');
      return value;
    }
    return value;
  }
}
