import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileAdapter } from './file.adapter';

@Injectable({
  providedIn: 'root',
})
export class FileConnector {
  constructor(protected uploadAdapter: FileAdapter) {}

  uploadFile(userId: string, file: File): Observable<any> {
    return this.uploadAdapter.uploadFile(userId, file);
  }
}
