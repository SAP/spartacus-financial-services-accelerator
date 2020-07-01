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
import { FormsSharedService } from '../service/forms-shared.service';

@Injectable({
  providedIn: 'root',
})
export class AutoPersonalDetailsGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected cartService: FSCartService,
    protected userService: UserService,
    protected formsSharedService: FormsSharedService,
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
          mainDriverDob = this.formsSharedService.convertIfDate(mainDriverDob);
          if (true) {
            //change to mainDriverDob === userDob when figgure out hot to transform frckn dates
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
      })
    );
  }

  filterQuoteDetailsEntry(cart: any, entry: string) {
    let entryValue;
    cart.insuranceQuote.quoteDetails.entry.forEach(item => {
      if (item.key == entry) {
        entryValue = item.value;
      }
    });
    return entryValue;
  }
}
