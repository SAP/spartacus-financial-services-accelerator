import { Observable } from 'rxjs';

export abstract class UploadAdapter {
  /**
   * Abstract method used to upload files
   *
   * @param userId The user id
   * @param files The file object
   */
  abstract uploadFiles(userId: string, files: File): Observable<any>;
}
