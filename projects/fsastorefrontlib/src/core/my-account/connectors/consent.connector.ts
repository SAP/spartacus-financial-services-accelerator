import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConsentAdapter } from './consent.adapter';
import { Address } from '@spartacus/core';

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

  transferCart(
    cartId: string,
    userId: string,
    oboCustomer: string
  ): Observable<any> {
    return this.adapter.transferCartToOboCustomer(cartId, userId, oboCustomer);
  }

  createAddressForUser(
    userId: string,
    oboCustomerId,
    address: Address
  ): Observable<{}> {
    return this.adapter.createAddressForUser(userId, oboCustomerId, address);
  }
}
