import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccEndpointsService } from '@spartacus/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ClaimAdapter } from './claim.adapter';
import { Claim, FSLocationOfLoss } from '../../occ-models';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccClaimAdapter implements ClaimAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  protected getClaimsEndpoint(userId: string) {
    const claimsEndpoint = '/users/' + userId + '/claims';
    return this.occEndpointService.getBaseEndpoint() + claimsEndpoint;
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
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public createClaim(userId: string, policyId: string, contractId: string) {
    const url =
      this.getClaimsEndpoint(userId) +
      '/create?contractId=' +
      contractId +
      '&policyId=' +
      policyId;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post(url, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public updateClaim(userId: string, claimId: string, claimData: any) {
    const url = this.getClaimsEndpoint(userId) + '/' + claimId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const claimBody: Claim =
      claimData !== undefined
        ? this.createClaimBody(claimData, {}, claimId)
        : {};
    return this.http
      .patch(url, claimBody, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public submitClaim(userId: string, claimId: string): Observable<any> {
    const url = this.getClaimsEndpoint(userId) + '/' + claimId + '/action';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const submitClaimAction = {
      actionName: 'SUBMIT',
    };

    return this.http
      .post(url, submitClaimAction, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected createClaimBody(claimData: any, claimBody: Claim, claimId: string) {
    const claim = JSON.parse(claimData);
    const location: FSLocationOfLoss = {
      code: claimData.locationOfLoss,
      city: claim.city,
      address: claim.address,
      countryCode: claim.country,
      postcode: claim.postcode,
      additionalDetails: claim.description,
    };
    claimBody = {
      dateOfLoss: claim.whenHappened,
      timeOfLoss: claim.whatTime,
      causeOfLoss: claim.howAccidentOccured,
      incidentType: { incidentCode: claim.whatHappened },
      locationOfLoss: location.countryCode !== undefined ? location : null,
      claimNumber: claimId,
      requestId: claim.requestId,
    };
    return claimBody;
  }
}
