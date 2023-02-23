import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from '@spartacus/dynamicforms';
import { DocumentService } from 'projects/fsastorefrontlib/src/core/my-account/facade';

@Component({
  selector: 'cx-fs-documents-table',
  templateUrl: './documents-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DocumentService],
})
export class DocumentsTableComponent implements OnDestroy {
  @Input()
  documentSource: any;
  @Input()
  referredObjectColumnVisible = true;
  subscription = new Subscription();
  selectedDocuments = [];
  signAllSelected = false;
  selectDocumentsWarning = '';
  noSelectedDocuments = undefined;

  constructor(
    protected fileService: FileService,
    protected documentService: DocumentService
  ) {}

  downloadDocument(document) {
    this.subscription.add(this.fileService.getDocument(document).subscribe());
  }

  isDocumentValid(document) {
    return !!document.code && !!document.mime;
  }

  checkDocumentByExternalSystem(externalSystem) {
    if (externalSystem) return 'External';
    return 'Internal';
  }

  consentDenied() {
    this.signAllSelected = false;
  }

  selectDocument(documentCode) {
    if (this.selectedDocuments?.includes(documentCode)) {
      this.selectedDocuments = this.selectedDocuments.filter(
        document => document !== documentCode
      );
    } else {
      this.selectedDocuments?.push(documentCode);
    }
  }

  signAll() {
    this.signAllSelected = true;
  }

  signAllConfirmed() {
    let signableDocuments = this.documentSource.filter(function (document) {
      return !document.insurancePolicy;
    });
    let result = signableDocuments.map(({ code }) => code);
    this.subscription.add(
      this.documentService
        .signDocuments('current', result.toString(), true)
        .subscribe()
    );
    this.signAllSelected = false;
  }

  signSelected() {
    if (this.selectedDocuments.length === 0) {
      this.noSelectedDocuments = true;
    } else {
      this.noSelectedDocuments = false;
      this.subscription.add(
        this.documentService
          .signDocuments('current', this.selectedDocuments.toString(), true)
          .subscribe()
      );
    }
  }

  signDocument(documentCode) {
    this.subscription.add(
      this.documentService
        .signDocuments('current', documentCode, true)
        .subscribe()
    );
  }

  isDocumentSignable(document) {
    if (document.insurancePolicy) {
      return 'N/A';
    } else {
      return 'Sign';
    }
  }

  isDocumentSignableBool(document) {
    return !document.insurancePolicy;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
