import { Injectable, OnDestroy } from '@angular/core';
import { EventService, LogoutEvent, UserIdService } from '@spartacus/core';
import { FSUser } from 'fsastorefrontlib/occ';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OboCustomerService implements OnDestroy {
  private subscription: Subscription = new Subscription();
  private selectedCustomer: BehaviorSubject<FSUser> = new BehaviorSubject(null);

  selectedCustomer$: Observable<FSUser> = this.selectedCustomer.asObservable();

  constructor(
    protected eventService: EventService,
    protected userIdService: UserIdService
  ) {
    this.subscription.add(
      this.eventService
        .get(LogoutEvent)
        .pipe(map(() => this.setSelectedCustomer(null)))
        .subscribe()
    );
  }

  setSelectedCustomer(user: FSUser) {
    this.selectedCustomer.next(user);
  }

  getOboCustomerUserId(): Observable<string> {
    return combineLatest([
      this.selectedCustomer$,
      this.userIdService.getUserId(),
    ]).pipe(
      map(([selectedCustomer, userOccId]) =>
        selectedCustomer ? selectedCustomer.uid : userOccId
      )
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
