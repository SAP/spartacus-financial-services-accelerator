import { Injectable } from '@angular/core';

@Injectable()
export class UserRequestDataService {
  private _userId = 'anonymous';
  private _requestId: any;

  constructor() {}

  set userId(val) {
    this._userId = val;
  }

  get userId(): string {
    return this._userId;
  }

  set requestId(val: any) {
    this._requestId = val;
  }

  get requestId(): any {
    return this._requestId;
  }
}
