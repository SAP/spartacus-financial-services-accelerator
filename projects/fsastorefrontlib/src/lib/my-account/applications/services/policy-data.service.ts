import { Injectable } from '@angular/core';
import { Policy } from '../store/reducers/policy.reducer';

@Injectable()
export class PolicyDataService {
  private _userId = 'anonymous';
  private _policies: Policy[];

  constructor() {}

  set userId(val) {
    this._userId = val;
  }

  get userId(): string {
    return this._userId;
  }

  set policies(val: Policy[]) {
    this._policies = val;
  }

  get policies(): Policy[] {
    return this._policies;
  }
}
