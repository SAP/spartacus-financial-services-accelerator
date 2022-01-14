import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FileService, DocumentFile } from '@spartacus/dynamicforms';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-fs-documents-overview',
  templateUrl: './documents-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsOverviewComponent implements OnInit {
  documentList$: Observable<any>;

  constructor(protected fileService: FileService) {}

  ngOnInit() {
    this.documentList$ = this.fileService.getFiles();
  }

  /**
   * Method used to fetch documents by checking their source. Document can be uploaded directly
   * by customer or received from external system.
   */
  getDocumentsBySource(
    documents: DocumentFile[],
    receivedByExternalSystem: boolean
  ) {
    return documents?.filter(
      document => document.createdByExternalSystem === receivedByExternalSystem
    );
  }
}
