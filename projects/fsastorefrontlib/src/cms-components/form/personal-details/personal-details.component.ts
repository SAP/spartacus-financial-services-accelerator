import { Component } from '@angular/core';
import {
  ActiveCartService,
  AuthService,
  UserAddressService,
} from '@spartacus/core';
import { filter, map, take } from 'rxjs/operators';
import {
  FormCMSComponent,
  FormDataService,
  FormDataStorageService,
  YFormCmsComponent,
} from '@spartacus/dynamicforms';
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
    protected authService: AuthService,
    protected userAddressService: UserAddressService
  ) {
    super(componentData, formDataService, formDataStorageService);
    this.userAddressService.loadAddresses();
  }

  loadFormDefinition() {
    this.subscription.add(
      combineLatest([
        this.cartService.getActive(),
        this.authService.isUserLoggedIn(),
      ])
        .pipe(
          filter(
            ([cart, loggedInUser]) =>
              cart.entries && cart.entries.length > 0 && loggedInUser
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
