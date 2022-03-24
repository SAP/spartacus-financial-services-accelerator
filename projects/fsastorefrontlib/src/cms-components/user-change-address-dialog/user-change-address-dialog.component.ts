import { Component, ElementRef, ViewChild } from "@angular/core";
import { ModalService } from "@spartacus/storefront";

@Component({
    selector: 'cx-fs-user-change-address-dialog',
    templateUrl: './user-change-address-dialog.component.html',
  })
  export class UserChangeAddressDialogComponent {

    @ViewChild('dialog', { static: false, read: ElementRef })
    dialog: ElementRef;

    constructor(
        protected modalService: ModalService
      ) {}

    dismissModal(reason?: any): void {
        this.modalService.dismissActiveModal(reason);
    }  

  }