import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '@spartacus/dynamicforms';
import { Observable, Subscription } from 'rxjs';

@Component({
  templateUrl: './documents.component.html',
})
export class DocumentsComponent implements OnInit, OnDestroy {
  documentList$: Observable<any>;
  subscription = new Subscription();

  constructor(protected fileService: FileService) {}

  ngOnInit() {
    this.documentList$ = this.fileService.getFiles();
  }

  downloadDocument(document) {
    this.subscription.add(this.fileService.getDocument(document).subscribe());
  }

  getReferredInsuranceObjects(document: any): string[] {
    const insuranceObjectCodes = [];
    if (document.insurancePolicy) {
      insuranceObjectCodes.push(document.insurancePolicy.policyNumber);
    }
    if (document.claim) {
      insuranceObjectCodes.push(document.claim.claimNumber);
    }
    return insuranceObjectCodes;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
