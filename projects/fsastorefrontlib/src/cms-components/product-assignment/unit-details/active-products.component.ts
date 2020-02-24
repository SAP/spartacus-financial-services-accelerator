import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { FSProductAssignmentService } from '../../../core/product-assignment/facade/product-assignment.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fsa-active-products.',
  templateUrl: './active-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveProductsComponent implements OnInit, OnDestroy {

  constructor(
    protected authService: AuthService,
    protected productAssignmentService: FSProductAssignmentService,
    protected route: ActivatedRoute
  ) { }
  private subscription = new Subscription();
  productAssignments$: Observable<any>;
  userId: string;
  orgUnitId: string;
  
  ngOnInit() {
    this.subscription
      .add(this.route.params.subscribe(params => this.initialize(params)))
      .add(
        this.authService
          .getOccUserId()
          .pipe(take(1))
          .subscribe( user => {
            if (user && user !== OCC_USER_ID_ANONYMOUS) {
              this.userId = user;
              this.productAssignmentService.loadProductAssignmentsForUnit(
                this.userId,
                this.orgUnitId
              );
            }
          })
      );
      this.productAssignments$ = this.productAssignmentService.getProductAssignments();
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
