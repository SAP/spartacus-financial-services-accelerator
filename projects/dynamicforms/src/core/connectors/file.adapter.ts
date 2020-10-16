import { Observable } from 'rxjs';

export abstract class FileAdapter {
  /**
   * Abstract method used to upload file
   *
   * @param userId The user id
   * @param files The file object
   */
  abstract uploadFile(userId: string, file: File): Observable<any>;
}
