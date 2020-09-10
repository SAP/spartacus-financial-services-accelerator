import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ModalService } from '@spartacus/storefront';
import { FormComponentService } from '../form-component.service';

@Component({
  selector: 'cx-form-popup-error',
  templateUrl: './form-popup-error.component.html',
})
export class FormPopupErrorComponent implements AfterViewInit {
  constructor(
    protected modalService: ModalService,
    protected formComponentService: FormComponentService
  ) {}

  modalInstance: any;

  @ViewChild('content') modalContent;

  open() {
    this.modalService
      .open(this.modalContent, {
        centered: true,
        size: 'lg',
      })
      .result.catch(() => {
        this.formComponentService.isPopulatedFormInvalidSource.next(false);
      });
  }

  ngAfterViewInit() {
    this.open();
  }
}
