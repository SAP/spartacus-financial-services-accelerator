import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeRequestAdapter } from './change-request.adapter';
import { user } from '@spartacus/assets/translations/en/user';

@Injectable({
  providedIn: 'root',
})
export class ChangeRequestConnector {
  constructor(protected changeRequestAdapter: ChangeRequestAdapter) {}

  createChangeRequestForPolicy(
    policyId,
    contractId,
    changeRequestType,
    userId
  ): Observable<any> {
    return this.changeRequestAdapter.createChangeRequestForPolicy(
      policyId,
      contractId,
      changeRequestType,
      userId
    );
  }

  simulateChangeRequest(userId, requestId, changeRequest) {
    return this.changeRequestAdapter.simulateChangeRequst(
      userId,
      requestId,
      changeRequest
    );
  }

  getChangeRequest(userId, requestId): Observable<any> {
    return this.changeRequestAdapter.getChangeRequest(userId, requestId);
  }
}
