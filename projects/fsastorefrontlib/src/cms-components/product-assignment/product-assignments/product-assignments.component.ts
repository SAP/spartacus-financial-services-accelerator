import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
import { FSProductAssignmentService } from './../../../core/product-assignment/facade/product-assignment.service';

@Component({
  selector: 'fsa-product-assignments',
  templateUrl: './product-assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAssignmentsComponent implements OnInit, OnDestroy {
  constructor(
    protected route: ActivatedRoute,
    protected authService: AuthService,
    protected productAssignmentService: FSProductAssignmentService
  ) {}

  private subscription = new Subscription();
  userId: string;
  orgUnitId: string;
  productAssignments$: Observable<any>;

  ngOnInit() {
    this.subscription
      .add(this.route.params.subscribe(params => this.initialize(params)))
      .add(
        this.authService
          .getOccUserId()
          .pipe(take(1))
          .subscribe(user => {
            if (user && user !== OCC_USER_ID_ANONYMOUS) {
              this.userId = user;
              this.productAssignmentService.loadProductAssignmentsForUnit(
                this.userId,
                this.orgUnitId,
                true
              );
            }
          })
      );
    this.productAssignments$ = this.productAssignmentService.getProductAssignments();
  }

  changeActiveStatus(productAssignmentCode: string, activeStatus: boolean) {
    if (this.productAssignments$) {
      return this.productAssignmentService.changeActiveStatus(
        this.userId,
        this.userId,
        productAssignmentCode,
        activeStatus
      );
    }
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
