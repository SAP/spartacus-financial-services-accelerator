import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { ModalService } from '@spartacus/storefront';
import { FormComponentService } from '../form-component.service';

@Component({
  selector: 'cx-pop-up',
  templateUrl: './pop-up.component.html',
})
export class PopUpComponent implements AfterViewInit {
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
        this.formComponentService.populatedFormInvalidSource.next(false);
      });
  }

  ngAfterViewInit() {
    this.open();
  }
}
