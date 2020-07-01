import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class FormsSharedService {
  protected inputDateFormat = 'dd-MM-yyyy';
  protected outputDateFormat = 'yyyy-MM-DD';

  convertIfDate(value) {
    const dateRegex = /^\d{1,2}\-\d{1,2}\-\d{4}$/;
    if (dateRegex.test(value)) {
      value = moment(value, this.inputDateFormat, false).format(
        this.outputDateFormat
      );
      return value;
    }
    return value;
  }
}
