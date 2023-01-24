import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentAdapter } from './document.adapter';

@Injectable({
  providedIn: 'root',
})
export class DocumentConnector {
  constructor(protected documentAdapter: DocumentAdapter) {}

  signDocuments(
    userId: string,
    documentCodes: string,
    signStatus: boolean
  ): Observable<any> {
    return this.documentAdapter.signDocuments(
      userId,
      documentCodes,
      signStatus
    );
  }
}
