import { Injectable } from '@angular/core';
import { DocumentConnector } from '../connectors/document.connector';
import { UserIdService } from '@spartacus/core';
import { take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(
    protected userIdService: UserIdService,
    protected documentConnector: DocumentConnector
  ) {}

  getDocumentById(documentId): Observable<any> {
    return this.userIdService.getUserId().pipe(
      take(1),
      switchMap(occUserId => {
        return this.documentConnector.getDocument(occUserId, documentId);
      })
    );
  }
}
