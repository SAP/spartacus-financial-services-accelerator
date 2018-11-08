import { Injectable } from '@angular/core';

export const ANONYMOUS_USERID = 'anonymous';

@Injectable()
export class ClaimDataService {
  private _userId = ANONYMOUS_USERID;
  private _claims : any;

  constructor() {}

  set userId(val) {
    this._userId = val;
  }

  get userId(): string {
    return this._userId;
  }

  set claims(val) {
    this._claims = val;
  }

  get claims(): string {
    return this._claims;
  }

}
