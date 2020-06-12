import { Observable } from 'rxjs';

export abstract class DocumentAdapter {
  /**
   * Abstract method used to fetch document by Id.
   *
   * @param userId The user id
   * @param documentId The document id
   */
  abstract getDocument(userId: string, documentId: string): Observable<any>;
}
