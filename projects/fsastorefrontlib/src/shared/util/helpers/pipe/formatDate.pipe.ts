import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DateConfig } from '../../../../core';

@Pipe({ name: 'cxFormatDate' })
export class FormatDatePipe implements PipeTransform {
  constructor(protected dateConfig: DateConfig, protected datePipe: DatePipe) {}

  transform(input: string | Date): any {
    const dateFormat = this.dateConfig?.date?.format || '';
    return this.datePipe.transform(input, dateFormat);
  }
}
