import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccConfig } from '@spartacus/core';

@Injectable()
export class OccPolicyService {
  constructor(
    protected http: HttpClient,
    protected config: OccConfig
    ) {}

  protected getPoliciesEndpoint(userId: string) {
    const policiesEndpoint = '/users/' + userId + '/policies';
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      policiesEndpoint
    );
  }

  protected getPolicyEndpoint(userId: string, policyId: string, contractId: string) {
    const policyEndpoint = '/users/' + userId + '/policies/' + policyId + '/contracts/' + contractId;
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
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

  public getPolicy(userId: string, policyId: string, contractId: string): Observable<any> {
    const url = this.getPolicyEndpoint(userId, policyId, contractId);
    const params = new HttpParams();
    
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
