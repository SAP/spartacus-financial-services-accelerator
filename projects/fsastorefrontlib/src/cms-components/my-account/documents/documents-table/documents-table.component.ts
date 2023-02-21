import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from '@spartacus/dynamicforms';

@Component({
  selector: 'cx-fs-documents-table',
  templateUrl: './documents-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsTableComponent implements OnDestroy {
  @Input()
  documentSource: any;
  @Input()
  referredObjectColumnVisible = true;
  subscription = new Subscription();
  selectedDocuments = [];

  constructor(protected fileService: FileService) {}

  downloadDocument(document) {
    this.subscription.add(this.fileService.getDocument(document).subscribe());
  }

  isDocumentValid(document) {
    return !!document.code && !!document.mime;
  }

  checkDocumentByExternalSystem(document) {
    if (document) return 'External';
    return 'Internal';
  }

  checkAllCheckBox(ev: any) {
    // Angular 13
    this.documentSource.forEach(x => (x.checked = ev.target.checked));
    console.log(ev);
  }

  isAllCheckBoxChecked() {
    return this.documentSource.every(p => p.checked);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
