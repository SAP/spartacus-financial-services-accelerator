import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConsentAdapter } from './consent.adapter';

@Injectable({
  providedIn: 'root',
})
export class ConsentConnector {
  constructor(protected adapter: ConsentAdapter) {}

  getConsents(userId: string): Observable<any> {
    return this.adapter.getConsents(userId);
  }

  getOBOCustomerList(userId: string): Observable<any> {
    return this.adapter.getOBOCustomerList(userId);
  }

  getOBOCustomer(userId: string, customerId: string): Observable<any> {
    return this.adapter.getOBOCustomer(userId, customerId);
  }

  getQuotesForOBOCustomer(userId: string, customerId: string): Observable<any> {
    return this.adapter.getQuotesForOBOCustomer(userId, customerId);
  }

  getPoliciesForOBOCustomer(
    userId: string,
    customerId: string
  ): Observable<any> {
    return this.adapter.getPoliciesForOBOCustomer(userId, customerId);
  }

  getClaimsForOBOCustomer(userId: string, customerId: string): Observable<any> {
    return this.adapter.getClaimsForOBOCustomer(userId, customerId);
  }
}
