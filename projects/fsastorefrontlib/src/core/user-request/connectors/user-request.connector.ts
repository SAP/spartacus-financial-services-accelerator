import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserRequestAdapter } from './user-request.adapter';
import { FSStepData } from '../../../occ/occ-models';

@Injectable({
  providedIn: 'root',
})
export class UserRequestConnector {
  constructor(protected adapter: UserRequestAdapter) {}

  getUserRequest(userId: string, requestId: string): Observable<any> {
    return this.adapter.getUserRequest(userId, requestId);
  }

  updateUserRequest(
    userId: string,
    requestId: string,
    stepData?: FSStepData
  ): Observable<any> {
    return this.adapter.updateUserRequest(userId, requestId, stepData);
  }

  submitUserRequest(userId: string, requestId: string): Observable<any> {
    return this.adapter.submitUserRequest(userId, requestId);
  }
}
