import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DocumentAdapter } from './../../../core/document/connectors/document.adapter';

@Injectable()
export class OccDocumentAdapter implements DocumentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getDocument(userId: string, documentId: string) {
    const url = this.occEndpointService.getUrl('documents', {
      userId,
      documentId,
    });
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
