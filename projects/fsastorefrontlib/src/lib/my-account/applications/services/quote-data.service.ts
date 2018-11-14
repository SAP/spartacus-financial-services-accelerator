import { Injectable } from '@angular/core';
import { ANONYMOUS_USERID } from './claim-data.service';
import { Quote } from '../components/quotes/quotes.component';


@Injectable()
export class QuoteDataService {
  private _userId = ANONYMOUS_USERID;
  private _quotes: Quote[];

  constructor() {}

  set userId(val) {
    this._userId = val;
  }

  get userId(): string {
    return this._userId;
  }

  set quotes(val: Quote[]) {
    this._quotes = val;
  }

  get quotes(): Quote[] {
    return this._quotes;
  }
}
