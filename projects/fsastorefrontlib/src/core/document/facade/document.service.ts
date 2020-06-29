import { Injectable } from '@angular/core';
import { DocumentConnector } from '../connectors/document.connector';
import { AuthService } from '@spartacus/core';
import { take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(
    protected authService: AuthService,
    protected documentConnector: DocumentConnector
  ) {}

  getDocumentById(documentId): Observable<any> {
    return this.authService.getOccUserId().pipe(
      take(1),
      switchMap(occUserId => {
        return this.documentConnector.getDocument(occUserId, documentId);
      })
    );
  }
}
