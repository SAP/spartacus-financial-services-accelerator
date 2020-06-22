import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DocumentAdapter } from './../../../core/document/connectors/document.adapter';
import { base64StringToBlob } from 'blob-util';

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
    return this.http.get<string>(url).pipe(
      map(document => base64StringToBlob(document, 'application/pdf')),
      catchError((error: any) => throwError(error.json()))
    );
  }
}
