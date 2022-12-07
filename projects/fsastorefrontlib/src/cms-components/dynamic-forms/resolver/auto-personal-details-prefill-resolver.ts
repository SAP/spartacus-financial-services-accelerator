import { Injectable } from '@angular/core';
import { PrefillResolver } from '@spartacus/dynamicforms';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FSCart } from '../../../occ/occ-models/occ.models';
import { FormsUtils } from '@spartacus/dynamicforms';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { UserAccountFacade } from '@spartacus/user/account/root';

@Injectable({
  providedIn: 'root',
})
export class AutoPersonalDetailsPrefillResolver implements PrefillResolver {
  constructor(
    protected cartService: FSCartService,
    protected userAccountFacade: UserAccountFacade
  ) {}

  getPrefillValue(fieldPath: string) {
    let currentValue;
    return combineLatest([
      this.cartService.getActive(),
      this.userAccountFacade.get(),
  ]).pipe(
      map(([cart, user]) => {
        const fsCart: FSCart = cart;
        const policyHolderSameAsMainDriver =
          fsCart?.insuranceQuote?.quoteDetails?.customerId;
        if (
          !!policyHolderSameAsMainDriver &&
          policyHolderSameAsMainDriver !== 'false'
        ) {
          currentValue = user;
          currentValue = currentValue[fieldPath];
          currentValue = FormsUtils.convertIfDate(currentValue);
        }
        return currentValue;
      })
    );
  }
}
