import { Injectable } from '@angular/core';
import {
  B2BUserAdapter,
  B2BUserConnector,
} from '@spartacus/organization/administration/core';
import { FSB2BUser } from '../../../../src/occ/occ-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FSB2BUserConnector extends B2BUserConnector {
  constructor(protected adapter: B2BUserAdapter) {
    super(adapter);
  }

  create(userId: string, orgCustomer: FSB2BUser): Observable<FSB2BUser> {
    return this.adapter.create(userId, orgCustomer);
  }

  update(
    userId: string,
    orgCustomerId: string,
    orgCustomer: FSB2BUser
  ): Observable<FSB2BUser> {
    return this.adapter.update(userId, orgCustomerId, orgCustomer);
  }
}
