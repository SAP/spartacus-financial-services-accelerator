import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '@spartacus/core';
import { FSProductAssignmentService } from '../../../core/product-assignment/facade/product-assignment.service';
import { switchMap } from 'rxjs/operators';
import { B2BAdministrator } from '../../../occ/occ-models';

@Component({
  selector: 'fsa-potential-product-assignments',
  templateUrl: './potential-product-assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PotentialProductAssignmentsComponent implements OnInit, OnDestroy {
  constructor(
    protected productAssignmentService: FSProductAssignmentService,
    protected userService: UserService
  ) {}

  private subscription = new Subscription();
  orgUnitId: string;
  productAssignments$: Observable<any>;

  ngOnInit() {
    this.productAssignments$ = this.userService.get().pipe(
      switchMap(user => {
        if (user && user.uid) {
          return this.productAssignmentService.loadCustomerProfile(
            `${user.uid}.com`
          );
        } else {
          return of();
        }
      })
    );
    this.subscription.add(
      this.productAssignments$.subscribe(orgUnitCustomer => {
        this.orgUnitId = (<B2BAdministrator>orgUnitCustomer).orgUnit.uid;
        if (this.orgUnitId) {
          this.productAssignmentService.loadPotentialProductAssignments(
            this.orgUnitId
          );
        }
      })
    );
    this.productAssignmentService.getAllProductAssignments().subscribe(data => {
      if (data) {
        console.log(data);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
