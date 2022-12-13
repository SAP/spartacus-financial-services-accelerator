import { Component, ViewChild, AfterViewInit, ViewContainerRef, ElementRef } from '@angular/core';

import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { map, take } from 'rxjs/operators';
import { FormComponentService } from '../form-component.service';

@Component({
  selector: 'cx-form-popup-error',
  templateUrl: './form-popup-error.component.html',
})
export class FormPopupErrorComponent implements AfterViewInit {
  constructor(
    protected launchDialogService: LaunchDialogService,
    protected formComponentService: FormComponentService,
    protected vcr: ViewContainerRef
  ) {}

  modalInstance: any;

  @ViewChild('content') modalContent : ElementRef;

  open() {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.FORM_POPUP_ERROR,
      this.modalContent,
      this.vcr
    )

    dialog?.pipe(take(1), map(resp => {
      this.formComponentService.isPopulatedFormInvalidSource.next(false);
    }))
    // this.modalService
    //   .open(this.modalContent, {
    //     centered: true,
    //     size: 'lg',
    //   })
    //   .result.catch(() => {
    //     this.formComponentService.isPopulatedFormInvalidSource.next(false);
    //   });
  }

  ngAfterViewInit() {
    this.open();
  }
}
