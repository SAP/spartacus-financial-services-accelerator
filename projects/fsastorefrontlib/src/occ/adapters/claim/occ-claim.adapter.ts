import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OccEndpointsService } from '@spartacus/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ClaimAdapter } from '../../../core/my-account/connectors/claim.adapter';
import { Claim, FSLocationOfLoss } from '../../occ-models';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccClaimAdapter implements ClaimAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getClaims(userId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('claims', {
      urlParams: {
        userId,
      },
    });
    const params = new HttpParams({ fromString: FULL_PARAMS });
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getClaim(userId: string, claimId: string) {
    const url = this.occEndpointService.buildUrl('claim', {
      urlParams: {
        userId,
        claimId,
      },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .get(url, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  deleteClaim(userId: string, claimId: string) {
    const url = this.occEndpointService.buildUrl('claim', {
      urlParams: {
        userId,
        claimId,
      },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createClaim(
    userId: string,
    policyId: string,
    contractId: string
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('createClaim', {
      urlParams: {
        userId,
      },
    });
    const params: HttpParams = new HttpParams()
      .set('contractId', contractId)
      .set('policyId', policyId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post(url, params, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateClaim(
    userId: string,
    claimId: string,
    claimData: any
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('claim', {
      urlParams: {
        userId,
        claimId,
      },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const claimBody: Claim = claimData
      ? this.createClaimBody(claimData, {}, claimId)
      : {};
    return this.http
      .patch(url, claimBody, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected createClaimBody(claimData: any, claimBody: Claim, claimId: string) {
    const claim = claimData.content ? JSON.parse(claimData.content) : {};
    const documents = claimData.documents;
    if (claim) {
      const location: FSLocationOfLoss = {
        city: claim.city,
        address: claim.address,
        countryCode: claim.country,
        postcode: claim.postcode,
        additionalDetails: claim.description,
      };
      claimBody = {
        dateOfLoss: claim.whenHappened,
        timeOfLoss: claim.whatTime,
        causeOfLoss: claim.howAccidentOccurred,
        incidentType: { incidentCode: claim.whatHappened },
        locationOfLoss:
          location && location.countryCode !== undefined ? location : {},
        claimNumber: claimId,
        requestId: claim.requestId,
        documents: documents,
        properties: {
          entry: [
            {
              key: 'phFault',
              value: claim.phFault,
            },
            {
              key: 'reportedToPolice',
              value: claim.reportedToPolice,
            },
            {
              key: 'witnessExist',
              value: claim.witnessExist,
            },
            {
              key: 'entitledToDriveVehicle',
              value: claim.entitledToDriveVehicle,
            },
            {
              key: 'vehicleParked',
              value: claim.vehicleParked,
            },
            {
              key: 'otherVehicleInvolved',
              value: claim.otherVehicleInvolved,
            },
            {
              key: 'numberOfVehicleInvolved',
              value: claim.numberOfVehicleInvolved,
            },
          ],
        },
      };
    }
    return claimBody;
  }
}
