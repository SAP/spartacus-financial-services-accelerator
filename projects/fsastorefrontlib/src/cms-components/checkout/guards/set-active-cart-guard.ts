import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FSCartService } from '../../../core';
import { map } from 'rxjs/operators';
import {
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { MultiCartService } from '@spartacus/cart/base/core';
import { Cart } from '@spartacus/cart/base/root';

@Injectable({
  providedIn: 'root',
})
export class SetActiveCartGuard implements CanActivate {
  constructor(
    protected fsCartService: FSCartService,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService
  ) {}

  newActiveCart$: Observable<Cart>;

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.userIdService.getUserId().pipe(
      map(userId => {
        const guid = route.queryParams['guid'];
        if (guid) {
          this.setActiveCartForUser(guid, userId);
        }
        return true;
      })
    );
  }

  setActiveCartForUser(guid: string, userId: string) {
    if (userId === OCC_USER_ID_ANONYMOUS) {
      this.fsCartService.loadCart(guid, OCC_USER_ID_ANONYMOUS);
      this.newActiveCart$ = this.fsCartService.getCart(guid);
      this.fsCartService.setActiveCart(this.newActiveCart$);
    } else {
      this.multiCartService.mergeToCurrentCart({
        userId: userId,
        cartId: guid,
        extraData: {
          active: true,
        },
      });
    }
  }
}
