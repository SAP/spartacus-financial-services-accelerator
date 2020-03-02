import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { FSProductAssignmentService } from '../../../core/product-assignment/facade/product-assignment.service';

@Component({
  selector: 'fsa-potential-product-assignments',
  templateUrl: './potential-product-assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PotentialProductAssignmentsComponent implements OnInit, OnDestroy {
  constructor(protected productAssignmentService: FSProductAssignmentService) {}

  private subscription = new Subscription();
  userId: string;
  orgUnitId: string;
  productAssignments$: Observable<any>;

  ngOnInit() {
    this.subscription.add(
      this.productAssignmentService.loadCustomerProfile(
        'thomas.schmidt@sapfsa.com.com'
      )
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
