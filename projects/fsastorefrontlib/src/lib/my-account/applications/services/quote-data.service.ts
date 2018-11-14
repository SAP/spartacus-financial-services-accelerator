import { Injectable } from '@angular/core';
import { Policy } from '../..';
import { ANONYMOUS_USERID } from './claim-data.service';


@Injectable()
export class QuoteDataService {
  private _userId = ANONYMOUS_USERID;
  private _quotes: Policy[];

  constructor() {}

  set userId(val) {
    this._userId = val;
  }

  get userId(): string {
    return this._userId;
  }

  set quotes(val: Policy[]) {
    this._quotes = val;
  }

  get quotes(): Policy[] {
    return this._quotes;
  }
}
