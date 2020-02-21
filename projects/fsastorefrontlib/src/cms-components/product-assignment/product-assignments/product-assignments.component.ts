import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription, pipe } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService, AuthService, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'fsa-product-assignments',
  templateUrl: './product-assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAssignmentsComponent implements OnInit, OnDestroy {

  constructor(
    protected route: ActivatedRoute,
    protected authService: AuthService,
  ) { }

  private subscription = new Subscription();
  userId: string;
  orgUnitId: string;

  ngOnInit() {
    this.subscription
      .add(this.route.params.subscribe(params => this.initialize(params)))
      .add(
        this.authService.getOccUserId().pipe(take(1)).subscribe(user => {
          if (user && user !== OCC_USER_ID_ANONYMOUS) {
            this.userId = user;
          }
        })
      );
  }

  private initialize(params: Params) {
    if (params) {
      this.orgUnitId = params.orgUnitId;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
