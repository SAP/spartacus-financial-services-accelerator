import { Injectable } from '@angular/core';
import { Policy } from '../store/reducers/policy.reducer';

@Injectable()
export class PolicyDataService {
  private _userId = 'anonymous';
  private _policyCategoryCode: string;
  private _policies: Policy[];

  constructor() {}

  set userId(val) {
    this._userId = val;
  }
  get userId(): string {
    return this._userId;
  }

  set policyCategoryCode(val) {
    this._policyCategoryCode = val;
  }
  get policyCategoryCode(): string {
    return this._policyCategoryCode;
  }

  set policies(val: Policy[]) {
    this._policies = val;
  }
  get policies(): Policy[] {
    return this._policies;
  }
}
