import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService, UserIdService } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Loan } from '../models/loan-interface';
import { LoansAdapter } from './loans.adapter';

@Injectable()
export class OccLoansAdapter implements LoansAdapter {
  constructor(
    private http: HttpClient,
    private occEndpointService: OccEndpointsService,
    private userIdService: UserIdService
  ) {}

  getLoans(userId): Observable<any> {
    const url = this.occEndpointService.buildUrl('loans', {
      urlParams: {
        userId,
      },
    });
    let params: HttpParams = new HttpParams().set(
      'categoryCode',
      'banking_loans'
    );
    return this.http
      .get(url, { params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
