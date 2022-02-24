import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConsentAdapter } from './consent.adapter';
import { Address, User } from '@spartacus/core';
import { FSSearchConfig } from '../services/inbox-data.service';
import { OBOCustomerList } from '../../../occ/occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class ConsentConnector {
  constructor(protected adapter: ConsentAdapter) {}

  getConsents(userId: string): Observable<any> {
    return this.adapter.getConsents(userId);
  }

  getOBOCustomerList(
    userId: string,
    searchConfig?: FSSearchConfig
  ): Observable<OBOCustomerList> {
    return this.adapter.getOBOCustomerList(userId, searchConfig);
  }

  getOBOCustomer(userId: string, customerId: string): Observable<any> {
    return this.adapter.getOBOCustomer(userId, customerId);
  }

  createOBOCustomer(consentHolder: string, details: User): Observable<any> {
    return this.adapter.createOBOCustomer(consentHolder, details);
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

  updateOBOPermission(
    userId: string,
    oboConsentHolderUid: string,
    oboPermissionName: string,
    oboPermissionValue: boolean
  ): Observable<{}> {
    return this.adapter.updateOBOPermission(
      userId,
      oboConsentHolderUid,
      oboPermissionName,
      oboPermissionValue
    );
  }
}
