import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignDocumentsAdapter } from './sign-documents.adapter';

@Injectable({
  providedIn: 'root',
})
export class SignDocumentsConnector {
  constructor(protected signDocumentsAdapter: SignDocumentsAdapter) {}

  signDocuments(
    userId: string,
    documentCodes: string,
    signStatus: boolean
  ): Observable<any> {
    return this.signDocumentsAdapter.signDocuments(
      userId,
      documentCodes,
      signStatus
    );
  }
}
