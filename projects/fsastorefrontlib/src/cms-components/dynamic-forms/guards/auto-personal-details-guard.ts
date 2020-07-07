import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  RoutingService,
  UserService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { map, filter } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { FSCartService } from '../../../core/cart/facade/cart.service';
import { FormsUtils } from '../utils/forms-utils';
import { FSCart, FSUser } from '../../../../src/occ/occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class AutoPersonalDetailsGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected cartService: FSCartService,
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService
  ) {}
  private readonly policyHolderSameAsMainDriverPath =
    'insuranceQuote.quoteDetails.policyHolderSameAsMainDriver';
  private readonly mainDriverDobPath =
    'insuranceQuote.insuredObjectList.insuredObjects[0].childInsuredObjectList.insuredObjects[0].dateOfBirth';
  canActivate(): Observable<boolean> {
    return combineLatest([
      this.cartService.getActive(),
      this.userService.get(),
      this.cartService.isStable(),
    ]).pipe(
      filter(([cart, user, loaded]) => loaded),
      map(([cart, user]) => {
        const fsCart: FSCart = FormsUtils.serializeQuoteDetails(cart);
        const policyHolderSameAsMainDriver = FormsUtils.getValueByPath(
          this.policyHolderSameAsMainDriverPath,
          fsCart
        );
        if (policyHolderSameAsMainDriver === 'true') {
          const mainDriverDob = FormsUtils.getValueByPath(
            this.mainDriverDobPath,
            fsCart
          );
          const userDob = (<FSUser>user).dateOfBirth;
          if (FormsUtils.convertIfDate(mainDriverDob) === userDob) {
            return true;
          } else {
            this.globalMessageService.add(
              { key: 'forms.policyHolderNotSameAsMainDriver' },
              GlobalMessageType.MSG_TYPE_INFO
            );
            this.routingService.go({ cxRoute: 'home' });
            return false;
          }
        }
        return true;
      })
    );
  }
}
