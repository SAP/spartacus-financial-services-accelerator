import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'parseDate' })
export class ParseDatePipe implements PipeTransform {
  transform(input: string): Date {
    const trimmedDate = input.split(' ');
    if (trimmedDate.length === 6) {
      trimmedDate.splice(4, 1);
      return new Date(trimmedDate.join(' '));
    } else {
      return new Date(input);
    }
  }
}
