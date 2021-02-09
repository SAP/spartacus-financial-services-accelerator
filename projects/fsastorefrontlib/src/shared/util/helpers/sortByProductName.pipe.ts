import { Pipe, PipeTransform } from '@angular/core';
import { OrderEntry } from '@spartacus/core';

@Pipe({ name: 'cxSortByProductName' })
export class SortByProductNamePipe implements PipeTransform {
  transform(input: OrderEntry[]): any {
    return input.sort((a, b) => a.product.name.localeCompare(b.product.name));
  }
}
