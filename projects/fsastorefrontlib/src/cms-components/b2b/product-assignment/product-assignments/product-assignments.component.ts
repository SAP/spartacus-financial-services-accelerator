import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';

@Component({
  selector: 'cx-fs-product-assignments',
  templateUrl: './product-assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAssignmentsComponent implements OnInit, OnDestroy {
  constructor(
    protected route: ActivatedRoute,
    protected productAssignmentService: ProductAssignmentService
  ) {}

  private subscription = new Subscription();
  userId: string;
  orgUnitId: string;
  productAssignments$: Observable<any>;

  ngOnInit() {
    this.subscription
      .add(this.route.params.subscribe(params => this.initialize(params)))
      .add(
        this.productAssignmentService.loadProductAssignmentsForUnit(
          this.orgUnitId
        )
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
