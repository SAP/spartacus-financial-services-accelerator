import { Observable } from 'rxjs';

export abstract class UploadAdapter {
  /**
   * Abstract method used to upload files
   *
   * @param userId The user id
   * @param files The file object
   */
  abstract uploadFiles(userId: string, files: File): Observable<any>;

  /**
   * Abstract method used to remove file by code
   *
   * @param userId The user id
   * @param fileCode The file code
   */
  abstract removeFile(userId: string, fileCode: string): Observable<any>;
}
