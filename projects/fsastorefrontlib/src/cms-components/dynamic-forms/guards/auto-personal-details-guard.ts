import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FSCart, FSUser } from '../../../../src/occ/occ-models/occ.models';
import { FSCartService } from '../../../core/cart/facade/cart.service';
import { FormsUtils } from '../utils/forms-utils';

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
    'insuranceQuote.quoteDetails.customerId';
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
        const fsCart: FSCart = FormsUtils.serializeCartEntries(cart);
        const policyHolderSameAsMainDriver = FormsUtils.getValueByPath(
          this.policyHolderSameAsMainDriverPath,
          fsCart
        );
        if (
          !!policyHolderSameAsMainDriver &&
          policyHolderSameAsMainDriver !== 'false'
        ) {
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
