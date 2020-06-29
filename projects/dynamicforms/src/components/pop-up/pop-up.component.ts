import { Component, OnInit, ChangeDetectorRef, Injector } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { LanguageService } from '@spartacus/core';
import { FormService } from '../../core/services/form/form.service';
import { ModalService } from '@spartacus/storefront';
import { PopupContentComponent } from './popup-content/popup-content.component';

@Component({
  selector: 'cx-pop-up',
  templateUrl: './pop-up.component.html',
})
export class PopUpComponent extends AbstractFormComponent implements OnInit {
  constructor(
    protected formConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected formService: FormService,
    protected injector: Injector,
    protected modalService: ModalService
  ) {
    super(formConfig, languageService, injector);
  }
  modalInstance: any;

  openModal() {
    this.modalInstance = this.modalService.open(PopupContentComponent, {
      centered: true,
      size: 'lg',
    }).componentInstance;
    this.modalInstance.errorMsgObject = this.config.error;
  }
  ngOnInit() {
    super.ngOnInit();
  }
}
