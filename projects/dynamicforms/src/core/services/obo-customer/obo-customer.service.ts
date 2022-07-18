import { Injectable, OnDestroy } from '@angular/core';
import { EventService, LogoutEvent, UserIdService } from '@spartacus/core';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OboCustomerService implements OnDestroy {
  private sessionStorageKey = 'selectedOboCustomerId';
  private subscription: Subscription = new Subscription();

  constructor(
    protected eventService: EventService,
    protected userIdService: UserIdService
  ) {
    this.onLogout();
  }

  setSelectedCustomer(user: any) {
    sessionStorage.setItem(this.sessionStorageKey, user.uid);
  }

  getOboCustomerUserId(): Observable<string> {
    return combineLatest([
      of(sessionStorage.getItem(this.sessionStorageKey)),
      this.userIdService.getUserId(),
    ]).pipe(
      map(([selectedCustomer, userOccId]) =>
        selectedCustomer ? selectedCustomer : userOccId
      )
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private onLogout() {
    this.subscription.add(
      this.eventService
        .get(LogoutEvent)
        .pipe(tap(() => sessionStorage.removeItem(this.sessionStorageKey)))
        .subscribe()
    );
  }
}
