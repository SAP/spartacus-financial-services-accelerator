import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
import {combineLatest, Observable, of, Subscription} from 'rxjs';
import {FSCartService} from '../../../core';
import { filter, map, take } from 'rxjs/operators';
import {OrderEntry, RoutingService, UserIdService} from '@spartacus/core';
import { Cart } from '@spartacus/core';
@Injectable({
  providedIn: 'root',
})
export class AddOptionsGuard implements CanActivate {
  constructor(
    protected fsCartService: FSCartService,
    protected activatedRoute: ActivatedRoute,
    protected userIdService: UserIdService,
    protected routingService: RoutingService
  ) {}

  newCart$: Observable<Cart>;
  subscription = new Subscription();

  canActivate(): Observable<boolean> {
    this.subscription.add(
      combineLatest([
        this.activatedRoute.queryParamMap,
        this.userIdService.getUserId(),
      ])
      .pipe(
        map(([param, userId]) => {
          let guid = param.get('guid');
          console.log("Get in guard, guid: " + guid);
          if (guid) {
            this.chatbotSetActiveCart(guid, userId);
          }
        })
      ).subscribe()
    );
    return of(true);
  }
  /*
    canActivate(): Observable<boolean> {
      this.activatedRoute.queryParamMap
        .pipe(
          map(param => {
            console.log('Entered step 1');
            let guid = param.get('guid');
            if (guid) {
              console.log('Entered step 2, guid=' + guid);
              this.fsCartService.loadCart(guid, 'anonymous');
            }
          })
        )
        .subscribe();
  */
  /*
  this.activatedRoute.queryParams.subscribe(params => {
    let guid = params['guid'];
    console.log('Entered step 1');
    if (guid) {
      console.log('Entered step 2, guid=' + guid);
      this.fsCartService.loadCart(guid, 'anonymous');
    }
  });


  return of(true);
}
*/
  chatbotSetActiveCart(guid: string, userId: string) {
    if (!guid) {
      return;
    }
    this.fsCartService.loadCart(guid, userId);
    this.newCart$ = this.fsCartService.getCart(guid);
    this.fsCartService.setChatbotCart(this.newCart$);
  }
}
