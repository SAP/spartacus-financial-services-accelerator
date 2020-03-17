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
import { switchMap, map } from 'rxjs/operators';
import { B2BAdministrator } from '../../../occ/occ-models';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fsa-potential-product-assignments',
  templateUrl: './potential-product-assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PotentialProductAssignmentsComponent implements OnInit, OnDestroy {
  constructor(
    protected route: ActivatedRoute,
    protected productAssignmentService: FSProductAssignmentService,
    protected userService: UserService
  ) {}

  private subscription = new Subscription();
  orgUnitId: string;
  parentOrgUnit: string;
  productAssignments$: Observable<any>;
  availableProductAssignments$: Observable<any>;

  ngOnInit() {
    this.subscription
      .add(this.route.params.subscribe(params => this.initialize(params)))
      .add(
        this.userService
          .get()
          .pipe(
            map(user => {
              if (user && user.uid) {
                this.parentOrgUnit = (<B2BAdministrator>user).orgUnit.uid;
                if (this.parentOrgUnit) {
                  this.productAssignmentService.loadPotentialProductAssignments(
                    this.parentOrgUnit
                  );
                }
              }
            })
          )
          .subscribe()
      )
      .add(
        this.productAssignmentService.loadProductAssignmentsForUnit(
          this.orgUnitId
        )
      );
    this.availableProductAssignments$ = this.productAssignmentService.getPotentialProductAssignments();
    this.productAssignments$ = this.productAssignmentService.getProductAssignments();
  }

  onAssign(productCode) {
    return this.productAssignmentService.createProductAssignment(
      this.orgUnitId,
      productCode
    );
  }

  onDeassign(productAssignmentCode) {
    return this.productAssignmentService.removeProductAssignment(
      this.orgUnitId,
      productAssignmentCode,
      this.parentOrgUnit
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
