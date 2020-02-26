import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { FSProductAssignmentService } from '../../../core/product-assignment/facade/product-assignment.service';

@Component({
  selector: 'fsa-active-products',
  templateUrl: './active-product-assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveProductAssignmentsComponent implements OnInit, OnDestroy {
  constructor(
    protected productAssignmentService: FSProductAssignmentService,
    protected route: ActivatedRoute,
    protected routingService: RoutingService
  ) {}

  private subscription = new Subscription();
  productAssignments$: Observable<any>;
  userId: string;
  orgUnitId: string;

  ngOnInit() {
    this.subscription
      .add(this.route.params.subscribe(params => this.initialize(params)))
      .add(
        this.productAssignmentService.loadProductAssignmentsForUnit(
          this.orgUnitId,
          true
        )
      );
    this.productAssignments$ = this.productAssignmentService.getProductAssignments();
  }

  private initialize(params: Params) {
    if (params) {
      this.orgUnitId = params.orgUnitId;
    }
  }

  navigateTo() {
    this.routingService.go({
      cxRoute: 'productAssignments',
      params: { orgUnitId: this.orgUnitId },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
