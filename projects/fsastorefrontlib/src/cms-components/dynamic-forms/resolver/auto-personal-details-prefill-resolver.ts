import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from '@fsa/dynamicforms';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { UserService } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { FormsUtils } from '../utils/forms-utils';
import { FSCart } from '../../../../src/occ/occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class AutoPersonalDetailsPrefillResolver implements PrefillResolver {
  constructor(
    protected cartService: FSCartService,
    protected userService: UserService
  ) {}

  getFieldValue(fieldPath: string) {
    let currentValue;
    return combineLatest([
      this.cartService.getActive(),
      this.userService.get(),
    ]).pipe(
      map(([cart, user]) => {
        console.log(cart);
        const fsCart: FSCart = cart;
        const policyHolderSameAsMainDriver =
          fsCart.insuranceQuote.quoteDetails.policyHolderSameAsMainDriver;
        if (policyHolderSameAsMainDriver === 'true') {
          currentValue = user;
          currentValue = currentValue[fieldPath];
          currentValue = FormsUtils.convertIfDate(currentValue);
        }
        return currentValue;
      })
    );
  }
}
