import { ChangeRequestAdapter } from './change-request.adapter';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeRequestConnector {
  constructor(protected changeRequestAdapter: ChangeRequestAdapter) {}

  createChangeRequestForPolicy(policyId, contractId, userId): Observable<any> {
    return this.changeRequestAdapter.createChangeRequestForPolicy(
      policyId,
      contractId,
      userId
    );
  }
}
