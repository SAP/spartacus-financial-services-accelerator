import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeRequestAdapter } from './change-request.adapter';

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
    return this.changeRequestAdapter.simulateChangeRequest(
      userId,
      requestId,
      changeRequest
    );
  }

  getChangeRequest(userId, requestId): Observable<any> {
    return this.changeRequestAdapter.getChangeRequest(userId, requestId);
  }

  cancelChangeRequest(userId: string, requestId: string): Observable<any> {
    return this.changeRequestAdapter.cancelChangeRequest(userId, requestId);
  }
}
