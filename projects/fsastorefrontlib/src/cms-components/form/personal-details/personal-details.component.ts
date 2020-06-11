import { Component } from '@angular/core';
import { ActiveCartService } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import {
  FormCMSComponent,
  FormDataService,
  FormDataStorageService,
  YFormCmsComponent,
} from '@fsa/dynamicforms';
import { CmsComponentData } from '@spartacus/storefront';
import {
  FSProduct,
  FormDefinitionType,
} from './../../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-personal-details',
  templateUrl: './personal-details.component.html',
})
export class PersonalDetailsComponent extends FormCMSComponent {
  constructor(
    protected componentData: CmsComponentData<YFormCmsComponent>,
    protected cartService: ActiveCartService,
    protected formDataService: FormDataService,
    protected formDataStorageService: FormDataStorageService
  ) {
    super(componentData, formDataService, formDataStorageService);
  }

  loadFormDefinition() {
    this.subscription.add(
      this.cartService
        .getActive()
        .pipe(
          filter(cart => cart.entries !== undefined),
          map(cart => {
            const mainProduct = <FSProduct>cart.entries[0].product;
            if (mainProduct && mainProduct.defaultCategory) {
              this.formDataService.loadFormDefinitions(
                mainProduct.defaultCategory.code,
                FormDefinitionType.PERSONAL_DETAILS
              );
            }
          })
        )
        .subscribe()
    );
  }
}
