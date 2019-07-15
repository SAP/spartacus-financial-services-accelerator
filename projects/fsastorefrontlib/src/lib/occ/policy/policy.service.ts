import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccConfig } from '@spartacus/core';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccPolicyService {
  constructor(
    protected http: HttpClient,
    protected config: OccConfig
    ) {}

  protected getPoliciesEndpoint(userId: string) {
    const policiesEndpoint = '/users/' + userId + '/policies';
    return (
      (this.config.backend.occ.baseUrl || '') +
      this.config.backend.occ.prefix +
      'insurance' +
      policiesEndpoint
    );
  }

  protected getPolicyEndpoint(userId: string, policyId: string, contractId: string) {
    const policyEndpoint = '/users/' + userId + '/policies/' + policyId + '/contracts/' + contractId;
    return (
      (this.config.backend.occ.baseUrl || '') +
      this.config.backend.occ.prefix +
      'insurance' +
      policyEndpoint
    );
  }

  public getPolicies(userId: string): Observable<any> {
    const url = this.getPoliciesEndpoint(userId);
    const params = new HttpParams();

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getPremiumCalendar(userId: string): Observable<any> {
    const url = this.getPoliciesEndpoint(userId) + '/premium-calendar';
    const params = new HttpParams({ fromString: FULL_PARAMS });

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getPolicy(userId: string, policyId: string, contractId: string): Observable<any> {
    const url = this.getPolicyEndpoint(userId, policyId, contractId);
    const params = new HttpParams();

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
