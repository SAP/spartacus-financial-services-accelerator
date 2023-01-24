import { Injectable } from '@angular/core';
import { DocumentConnector } from '../connectors';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(protected documentConnector: DocumentConnector) {}

  signDocuments(userId: string, documentCodes: string, signStatus: boolean) {
    return this.documentConnector.signDocuments(
      userId,
      documentCodes,
      signStatus
    );
  }
}
