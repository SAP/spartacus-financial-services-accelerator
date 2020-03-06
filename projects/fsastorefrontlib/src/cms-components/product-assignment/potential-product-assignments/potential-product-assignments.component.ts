import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
    protected userService: UserService,
    protected cd: ChangeDetectorRef
  ) {}

  private subscription = new Subscription();
  orgUnitId: string;
  customerProfile$: Observable<any>;
  productAssignments$: Observable<any>;
  availableProductAssignments$: Observable<any>;

  ngOnInit() {
    this.customerProfile$ = this.userService.get().pipe(
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
    this.subscription
      .add(this.route.params.subscribe(params => this.initialize(params)))
      .add(
        this.customerProfile$
          .pipe(
            map(orgUnitCustomer => {
              this.orgUnitId = (<B2BAdministrator>orgUnitCustomer).orgUnit.uid;
              if (this.orgUnitId) {
                this.productAssignmentService.loadPotentialProductAssignments(
                  this.orgUnitId
                );
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
    this.availableProductAssignments$ = this.productAssignmentService.getAllProductAssignments();
    // this.availableProductAssignments$.subscribe(data => console.log(data));
    this.productAssignments$ = this.productAssignmentService.getProductAssignments();
    // this.productAssignments$.subscribe(data => console.log(data));
  }

  private initialize(params: Params) {
    if (params) {
      this.orgUnitId = params.orgUnitId;
    }
  }

  onAssign(productCode) {
    this.cd.markForCheck();
    return this.productAssignmentService.createProductAssignment(
      'AirlineCompany',
      productCode
    );
  }

  onDessign(productAssignmentCode) {
    // this.productAssignmentService.createProductAssignment(
    //   'AirlineCompany',
    //   productAssignmentCode
    // );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
