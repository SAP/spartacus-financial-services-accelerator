import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'parseDate' })
export class ParseDatePipe implements PipeTransform {
  transform(input: string): Date {
    return new Date(input.replace('CET', ' '));
  }
}
