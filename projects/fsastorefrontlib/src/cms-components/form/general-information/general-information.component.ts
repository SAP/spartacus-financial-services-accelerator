import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormCMSComponent,
  FormDataService,
  FormDataStorageService,
  YFormCmsComponent,
} from '@spartacus/dynamicforms';
import { CmsComponentData } from '@spartacus/storefront';
import { map } from 'rxjs/operators';
import {
  BindingStateType,
  FormDefinitionType,
  FSCart,
} from '../../../occ/occ-models';
import { FSCartService } from '../../../core/cart/facade/cart.service';

@Component({
  selector: 'cx-fs-general-information',
  templateUrl: './general-information.component.html',
})
export class GeneralInformationComponent extends FormCMSComponent
  implements OnInit {
  constructor(
    protected componentData: CmsComponentData<YFormCmsComponent>,
    protected formDataService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected formDataStorageService: FormDataStorageService,
    protected cartService: FSCartService
  ) {
    super(componentData, formDataService, formDataStorageService);
  }

  formCategory: string;

  ngOnInit() {
    super.ngOnInit();
    if (!this.formDataId) {
      this.loadFormData();
    }
  }

  loadFormDefinition() {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          map(params => {
            this.formCategory = params['formCode'];
            this.formDataService.loadFormDefinitions(
              this.formCategory,
              FormDefinitionType.PRODUCT_CONFIGURE
            );
          })
        )
        .subscribe()
    );
  }

  loadFormData() {
    this.subscription.add(
      this.cartService
        .getActive()
        .pipe(
          map(cart => {
            if (cart.code) {
              const bindingState = (<FSCart>cart).insuranceQuote.state.code;
              if (bindingState !== BindingStateType.BIND) {
                const chooseCoverFormId = <any>(
                  (<FSCart>cart).insuranceQuote?.quoteDetails?.formId
                );
                if (chooseCoverFormId) {
                  this.formDataService.loadFormData(chooseCoverFormId);
                  this.formData$ = this.formDataService.getFormData();
                }
              }
            }
          })
        )
        .subscribe()
    );
  }
}
