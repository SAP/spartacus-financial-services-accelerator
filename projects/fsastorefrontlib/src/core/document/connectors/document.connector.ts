import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentAdapter } from './document.adapter';

@Injectable({
  providedIn: 'root',
})
export class DocumentConnector {
  constructor(protected documentAdapter: DocumentAdapter) {}

  getDocument(userId, documentId): Observable<any> {
    return this.documentAdapter.getDocument(userId, documentId);
  }
}
