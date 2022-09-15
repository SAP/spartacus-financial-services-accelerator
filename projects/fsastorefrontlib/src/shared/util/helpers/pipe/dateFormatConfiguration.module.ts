import { NgModule } from '@angular/core';
import { FormatDatePipe } from './formatDate.pipe';
import { ParseDatePipe } from './parseDate.pipe';

@NgModule({
  declarations: [FormatDatePipe, ParseDatePipe],
  exports: [FormatDatePipe, ParseDatePipe],
})
export class DateFormatConfigurationModule {}
