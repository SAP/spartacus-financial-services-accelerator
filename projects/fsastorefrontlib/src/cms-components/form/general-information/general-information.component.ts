import { Component } from '@angular/core';
import {
  FormCMSComponent,
  FormDataService,
  FormDataStorageService,
  YFormCmsComponent,
} from '@fsa/dynamicforms';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentData } from '@spartacus/storefront';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-general-information',
  templateUrl: './general-information.component.html',
})
export class GeneralInformationComponent extends FormCMSComponent {
  constructor(
    protected componentData: CmsComponentData<YFormCmsComponent>,
    protected formDataService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected formDataStorageService: FormDataStorageService
  ) {
    super(componentData, formDataService, formDataStorageService);
  }
  configuratorType = 'PRODUCT_CONFIGURE';
  formId: string;
  applicationId: string;

  loadFormDefinition() {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          map(params => {
            this.formDataService.loadFormDefinitionByCategory(
              params['formCode'],
              this.configuratorType
            );
          })
        )
        .subscribe()
    );
  }
}
