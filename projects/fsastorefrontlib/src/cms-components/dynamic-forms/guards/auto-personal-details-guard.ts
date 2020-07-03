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

  canActivate(): Observable<boolean> {
    let mainDriverDob;
    let userDob;
    let policyHolderSameAsMainDriver;
    return combineLatest([
      this.cartService.getActive(),
      this.userService.get(),
      this.cartService.isStable(),
    ]).pipe(
      filter(([cart, user, loaded]) => loaded),
      map(([cart, user]) => {
        const fsCart = <any>cart;
        const fsUser = <any>user;
        policyHolderSameAsMainDriver = this.filterQuoteDetailsEntry(
          fsCart,
          'policyHolderSameAsMainDriver'
        );
        if (policyHolderSameAsMainDriver === 'true') {
          mainDriverDob = this.filterQuoteDetailsEntry(fsCart, 'dateOfBirth');
          userDob = fsUser.dateOfBirth;
          mainDriverDob = FormsUtils.convertIfDate(mainDriverDob);
          if (mainDriverDob === userDob) {
            return true;
          } else {
            this.globalMessageService.add(
              { key: 'forms.policyHolderNotSameAsMainDriver' },
              GlobalMessageType.MSG_TYPE_INFO
            );
            this.routingService.go({ cxRoute: 'home' });
            return false;
          }
        } else {
          return true;
        }
      })
    );
  }

  protected filterQuoteDetailsEntry(cart: any, entryKey: string) {
    let entryValue;
    cart.insuranceQuote.quoteDetails.entry.forEach(item => {
      if (item.key === entryKey) {
        entryValue = item.value;
      }
    });
    return entryValue;
  }
}
