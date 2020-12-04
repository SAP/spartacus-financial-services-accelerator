import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PrefillResolver } from './prefill-resolver.interface';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentDatePrefillResolver implements PrefillResolver {
  constructor(private datePipe: DatePipe) {}
  getPrefillValue() {
    return of(this.datePipe.transform(Date.now(), 'yyyy-MM-dd'));
  }
}
