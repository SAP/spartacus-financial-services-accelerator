import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { B2BUnit } from '@spartacus/core/src/model';
import {
  CurrentUnitService,
  ListService,
} from '@spartacus/organization/administration/components';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';
import { PotentialAssignmentsListService } from './potential-assignments-list.service';

@Component({
  selector: 'cx-fs-potential-assignments',
  templateUrl: './potential-assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line  @angular-eslint/no-host-metadata-property
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: PotentialAssignmentsListService,
    },
  ],
})
export class PotentialAssignmentsComponent implements OnInit, OnDestroy {
  constructor(
    protected productAssignmentService: ProductAssignmentService,
    protected currentUnitService: CurrentUnitService
  ) {}

  private subscription = new Subscription();

  unit$: Observable<B2BUnit> = this.currentUnitService.item$;

  ngOnInit(): void {
    this.subscription.add(
      this.unit$
        .pipe(
          map(unit => {
            const unitId = unit.parentOrgUnit
              ? unit.parentOrgUnit.uid
              : unit.uid;
            this.productAssignmentService.loadPotentialProductAssignments(
              unitId
            );
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
