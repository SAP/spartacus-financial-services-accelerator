import { Injectable } from '@angular/core';
import { SignDocumentsConnector } from '../connectors';

@Injectable({
  providedIn: 'root',
})
export class SignDocumentsService {
  constructor(protected signDocumentsConnector: SignDocumentsConnector) {}

  signDocuments(userId: string, documentCodes: string, signStatus: boolean) {
    return this.signDocumentsConnector.signDocuments(
      userId,
      documentCodes,
      signStatus
    );
  }
}
