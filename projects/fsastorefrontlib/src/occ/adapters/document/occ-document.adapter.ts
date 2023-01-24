import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DocumentAdapter } from '../../../core';

@Injectable()
export class OccDocumentAdapter implements DocumentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  signDocuments(userId: string, documentCodes: string, signStatus: boolean) {
    const url = this.occEndpointService.buildUrl('signDocuments', {
      urlParams: {
        userId: userId,
      },
    });

    let params: HttpParams = new HttpParams();

    if (documentCodes) {
      params = params.set('documentCodes', documentCodes.toString());
      params = params.set('signStatus', signStatus);
    }
    return this.http
      .post(url, params)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
