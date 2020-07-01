import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from '@fsa/dynamicforms';
import { DatePipe } from '@angular/common';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { UserService } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { FormsSharedService } from '../service/forms-shared.service';

@Injectable({
  providedIn: 'root',
})
export class AutoPersonalDetailsPrefillResolver implements PrefillResolver {
  constructor(
    protected cartService: FSCartService,
    protected datePipe: DatePipe,
    protected userService: UserService,
    protected formsSharedService: FormsSharedService
  ) {}

  getFieldValue(fieldPath: string) {
    let currentValue;

    return combineLatest([
      this.cartService.getActive(),
      this.userService.get(),
    ]).pipe(
      map(([cart, user]) => {
        const fsCart: any = cart;
        const policyHolderSameAsMainDriver =
          fsCart.insuranceQuote.quoteDetails.policyHolderSameAsMainDriver;
        if (policyHolderSameAsMainDriver === 'true') {
          currentValue = user;
          currentValue = currentValue[fieldPath];
          currentValue = this.formsSharedService.convertIfDate(currentValue);
        }
        return currentValue;
      })
    );
  }
}
