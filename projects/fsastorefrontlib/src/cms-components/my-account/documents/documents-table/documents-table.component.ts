import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from '@spartacus/dynamicforms';

@Component({
  selector: 'cx-fs-documents-table',
  templateUrl: './documents-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsTableComponent {
  @Input()
  documentSource: any;
  subscription = new Subscription();

  constructor(protected fileService: FileService) {}

  downloadDocument(document) {
    this.subscription.add(this.fileService.getDocument(document).subscribe());
  }
}
