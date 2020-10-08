import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadAdapter } from './upload.adapter';

@Injectable({
  providedIn: 'root',
})
export class UploadConnector {
  constructor(protected uploadAdapter: UploadAdapter) {}

  uploadFile(userId: string, files: File): Observable<any> {
    return this.uploadAdapter.uploadFiles(userId, files);
  }
}
