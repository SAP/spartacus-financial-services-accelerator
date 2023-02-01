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
    let params: HttpParams = new HttpParams()
      .set('categoryCode', 'banking_loan')
      .set('statuses', 'COMPLETED');
    return this.http
      .get(url, { params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getLoanDetailsById(id: string): Observable<Loan> {
    return this.userIdService.getUserId().pipe(
      take(1),
      switchMap(userId => {
        const url = this.occEndpointService.buildUrl('loanDetails', {
          urlParams: {
            loanCode: id,
            userId,
          },
        });

        return this.http.get<Loan>(url);
      })
    );
  }
}
