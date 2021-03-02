import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FileService } from '@spartacus/dynamicforms';
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
}
