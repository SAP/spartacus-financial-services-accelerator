import {
  Component,
  OnInit,
  Injector,
  AfterViewChecked,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { LanguageService } from '@spartacus/core';
import { FormService } from '../../core/services/form/form.service';
import { ModalService } from '@spartacus/storefront';

@Component({
  selector: 'cx-pop-up',
  templateUrl: './pop-up.component.html',
})
export class PopUpComponent extends AbstractFormComponent
  implements OnInit, AfterViewChecked {
  constructor(
    protected formConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected formService: FormService,
    protected injector: Injector,
    protected modalService: ModalService
  ) {
    super(formConfig, languageService, injector, formService);
  }
  modalInstance: any;
  @ViewChild('content') modalContent: ElementRef;

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewChecked() {
    this.modalService.open(this.modalContent, {
      centered: true,
      size: 'lg',
    });
  }
}
