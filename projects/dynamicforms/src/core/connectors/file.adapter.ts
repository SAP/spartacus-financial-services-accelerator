import { Observable } from 'rxjs';

export abstract class FileAdapter {
  /**
   * Abstract method used to fetch file by code for specified user
   *
   * @param userId The user id
   * @param fileCode The file code
   * @param fileType The file type
   */
  abstract getFileForCodeAndType(
    userId: string,
    fileCode: string,
    fileType: string
  ): Observable<any>;
  /**
   * Abstract method used to fetch files for yser
   *
   * @param userId The user id
   * @param fileCodes The file codes
   */
  abstract getFilesForUser(
    userId: string,
    fileCodes?: Array<string>
  ): Observable<any>;
  /**
   * Abstract method used to upload file
   *
   * @param userId The user id
   * @param files The file object
   */
  abstract uploadFile(userId: string, file: File): Observable<any>;

  /**
   * Abstract method used to remove file by code
   *
   * @param userId The user id
   * @param fileCode The file code
   */
  abstract removeFileForUserAndCode(
    userId: string,
    fileCode: string
  ): Observable<any>;
}
