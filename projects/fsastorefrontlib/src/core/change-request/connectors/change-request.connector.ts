import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeRequestAdapter } from './change-request.adapter';

@Injectable({
  providedIn: 'root',
})
export class ChangeRequestConnector {
  constructor(protected changeRequestAdapter: ChangeRequestAdapter) { }

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

  getChangeRequest(userId, requestId): Observable<any> {
    return this.changeRequestAdapter.getChangeRequest(userId, requestId);
  }

  cancelChangeRequest(userId: string, requestId: string) {
    return this.changeRequestAdapter.cancelChangeRequest(userId, requestId);
  }
}
