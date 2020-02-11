import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BillingTimeAdapter } from './billing-time.adapter';

@Injectable({
  providedIn: 'root',
})
export class BillingTimeConnector {
  constructor(protected adapter: BillingTimeAdapter) {}

  getBillingTimes(productCodes: string[]): Observable<any> {
    return this.adapter.getBillingTimes(productCodes);
  }
}
