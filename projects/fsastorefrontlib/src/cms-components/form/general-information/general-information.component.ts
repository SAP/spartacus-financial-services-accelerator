import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormCMSComponent,
  FormDataService,
  FormDataStorageService,
  YFormCmsComponent,
} from '@fsa/dynamicforms';
import { CmsComponentData } from '@spartacus/storefront';
import { map } from 'rxjs/operators';
import { FormDefinitionType } from '../../../occ/occ-models';

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

  formCategory: string;

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
}
