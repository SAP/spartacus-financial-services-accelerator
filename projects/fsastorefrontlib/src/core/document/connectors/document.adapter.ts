import { Observable } from 'rxjs';

export abstract class DocumentAdapter {
  /**
   * Abstract method used to get change request
   *
   * @param userId The user id
   * @param documentId The document id
   */
  abstract getDocument(userId: string, documentId: string): Observable<any>;
}
