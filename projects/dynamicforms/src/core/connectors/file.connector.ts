import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileAdapter } from './file.adapter';

@Injectable({
  providedIn: 'root',
})
export class FileConnector {
  constructor(protected uploadAdapter: FileAdapter) {}

  getFile(userId: string, fileCode: string, fileType: string): Observable<any> {
    return this.uploadAdapter.getFileForCodeAndType(userId, fileCode, fileType);
  }

  uploadFile(userId: string, file: File): Observable<any> {
    return this.uploadAdapter.uploadFile(userId, file);
  }

  removeFile(userId: string, fileCode: string): Observable<any> {
    return this.uploadAdapter.removeFileForUserAndCode(userId, fileCode);
  }
}
