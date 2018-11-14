import { Injectable } from '@angular/core';
import { Policy } from '../..';
import { ANONYMOUS_USERID } from './claim-data.service';

@Injectable()
export class PolicyDataService {
  private _userId = ANONYMOUS_USERID;
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
