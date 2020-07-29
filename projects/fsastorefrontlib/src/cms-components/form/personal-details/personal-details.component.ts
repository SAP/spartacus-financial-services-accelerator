import { Component } from '@angular/core';
import {
  ActiveCartService,
  OCC_USER_ID_ANONYMOUS,
  AuthService,
} from '@spartacus/core';
import { filter, map, take } from 'rxjs/operators';
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
import { combineLatest } from 'rxjs';

@Component({
  selector: 'cx-fs-personal-details',
  templateUrl: './personal-details.component.html',
})
export class PersonalDetailsComponent extends FormCMSComponent {
  constructor(
    protected componentData: CmsComponentData<YFormCmsComponent>,
    protected cartService: ActiveCartService,
    protected formDataService: FormDataService,
    protected formDataStorageService: FormDataStorageService,
    protected authService: AuthService
  ) {
    super(componentData, formDataService, formDataStorageService);
  }

  loadFormDefinition() {
    this.subscription.add(
      combineLatest([
        this.cartService.getActive(),
        this.authService.getUserToken(),
      ])
        .pipe(
          filter(
            ([cart, userToken]) =>
              cart.entries &&
              cart.entries.length > 0 &&
              userToken.userId !== OCC_USER_ID_ANONYMOUS
          ),
          take(1),
          map(([cart]) => {
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
