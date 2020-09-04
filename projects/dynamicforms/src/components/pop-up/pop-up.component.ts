import { Component, AfterViewChecked, ViewChild } from '@angular/core';

import { ModalService } from '@spartacus/storefront';
import { FormComponentService } from '../form-component.service';

@Component({
  selector: 'cx-pop-up',
  templateUrl: './pop-up.component.html',
})
export class PopUpComponent implements AfterViewChecked {
  constructor(
    protected modalService: ModalService,
    protected formComponentService: FormComponentService
  ) {}

  modalInstance: any;
  @ViewChild('content') modalContent;

  close() {
    this.modalService.closeActiveModal();
    this.formComponentService.populatedFormInvalidSource.next(false);
  }

  ngAfterViewChecked() {
    this.modalService.open(this.modalContent, {
      centered: true,
      size: 'lg',
    });
  }
}
