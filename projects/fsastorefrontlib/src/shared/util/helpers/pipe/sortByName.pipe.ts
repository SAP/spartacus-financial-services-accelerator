import { Pipe, PipeTransform } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';

@Pipe({ name: 'cxSortByName' })
export class SortByNamePipe implements PipeTransform {
  transform(input: OrderEntry[], prop1: string, prop2: string): any {
    return input.sort((a, b) =>
      a[prop1]?.[prop2].localeCompare(b[prop1]?.[prop2])
    );
  }
}
