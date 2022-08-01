import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { FSCartService } from '../../../core';
import { filter, map, take } from 'rxjs/operators';
import {
  MultiCartService,
  OCC_USER_ID_ANONYMOUS,
  OrderEntry,
  RoutingService,
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
    protected routingService: RoutingService,
    protected multiCartService: MultiCartService
  ) {}

  newCart$: Observable<Cart>;
  subscription = new Subscription();

  canActivate(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.userIdService.getUserId().pipe(
      map(userId => {
        console.log(route);
        let guid = route.queryParams['guid'];
        console.log('Get in guard, guid: ' + guid);
        if (guid) {
          if (userId === OCC_USER_ID_ANONYMOUS) {
            console.log('set active cart for anynomous');
            this.chatbotSetActiveCart(guid, userId);
          } else {
            console.log('bla');
            this.chatbotSetActiveCart2(guid, userId);
          }
          return true;
        }
        return true;
      })
    );
  }

  chatbotSetActiveCart(guid: string, userId: string) {
    if (!guid) {
      return;
    }
    this.fsCartService.loadCart(guid, userId);
    this.newCart$ = this.fsCartService.getCart(guid);
    this.fsCartService.setChatbotCart(this.newCart$);
  }

  chatbotSetActiveCart2(guid: string, userId: string) {
    if (!guid) {
      return;
    }
    this.multiCartService.mergeToCurrentCart({
      userId: userId,
      cartId: guid,
      extraData: {
        active: true,
      },
    });
  }
}
