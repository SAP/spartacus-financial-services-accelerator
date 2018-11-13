import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccConfig } from '@spartacus/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const FULL_PARAMS = 'fields=FULL';


@Injectable()
export class OccClaimService {
constructor(
  protected http: HttpClient,
  protected config: OccConfig
  ) {}

protected getClaimsEndpoint(userId: string) {
    const claimsEndpoint = '/users/' + userId + '/claims';
    return (
      (this.config.server.baseUrl || '') +
        this.config.server.occPrefix +
        this.config.site.baseSite +
           claimsEndpoint
    );
}

  public getClaims(userId: string): Observable<any> {
    const url = this.getClaimsEndpoint(userId);
    const params = new HttpParams({ fromString: FULL_PARAMS });
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public deleteClaim(userId: string, claimId: string) {
    const url = this.getClaimsEndpoint(userId) + '/' + claimId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}


