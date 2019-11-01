import { Injectable } from '@angular/core';
import { Quote } from '../store/reducers/quote.reducer';

@Injectable()
export class QuoteDataService {
  private _userId = 'anonymous';
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
