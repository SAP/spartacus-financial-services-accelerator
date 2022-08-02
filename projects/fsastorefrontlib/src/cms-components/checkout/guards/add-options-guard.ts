import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FSCartService } from '../../../core';
import { map } from 'rxjs/operators';
import {
  MultiCartService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { Cart } from '@spartacus/core';
@Injectable({
  providedIn: 'root',
})
export class AddOptionsGuard implements CanActivate {
  constructor(
    protected fsCartService: FSCartService,
    protected activatedRoute: ActivatedRoute,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService
  ) {}

  newCart$: Observable<Cart>;

  canActivate(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.userIdService.getUserId().pipe(
      map(userId => {
        let guid = route.queryParams['guid'];
        this.setActiveCartForUser(guid, userId);
        return true;
      })
    );
  }

  setActiveCartForUser(guid: string, userId: string) {
    if (guid) {
      if (userId === OCC_USER_ID_ANONYMOUS) {
        this.fsCartService.loadCart(guid, OCC_USER_ID_ANONYMOUS);
        this.newCart$ = this.fsCartService.getCart(guid);
        this.fsCartService.setActiveCart(this.newCart$);
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
}
