import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_ANONYMOUS,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FSUser } from '../../../../src/occ/occ-models/occ.models';
import { FSCartService } from '../../../core/cart/facade/cart.service';
import { FormsUtils } from '@spartacus/dynamicforms';
import { UserAccountFacade } from '@spartacus/user/account/root';

@Injectable({
  providedIn: 'root',
})
export class AutoPersonalDetailsGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected cartService: FSCartService,
    protected userAccountFacade: UserAccountFacade,
    protected globalMessageService: GlobalMessageService
  ) {}
  private readonly policyHolderSameAsMainDriverPath =
    'insuranceQuote.quoteDetails.customerId';
  private readonly mainDriverDobPath =
    'insuranceQuote.insuredObjectList.insuredObjects[0].childInsuredObjectList.insuredObjects[0].dateOfBirth';

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.cartService.getActive(),
      this.userAccountFacade.get(),
      this.cartService.isStable(),
    ]).pipe(
      filter(([_, user, loaded]) => this.isUserValid(user) && loaded),
      take(1),
      map(([cart, user]) => {
        const policyHolderSameAsMainDriver = FormsUtils.getValueByPath(
          this.policyHolderSameAsMainDriverPath,
          cart
        );
        if (
          !!policyHolderSameAsMainDriver &&
          policyHolderSameAsMainDriver !== 'false'
        ) {
          const mainDriverDob = FormsUtils.getValueByPath(
            this.mainDriverDobPath,
            cart
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

  private isUserValid(user): boolean {
    return (
      user && Object.keys(user).length !== 0 && user !== OCC_USER_ID_ANONYMOUS
    );
  }
}
