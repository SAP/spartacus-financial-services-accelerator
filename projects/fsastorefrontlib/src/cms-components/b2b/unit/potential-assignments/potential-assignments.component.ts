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
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';
import { PotentialAssingmensListService } from './potential-assignments-list.service';

@Component({
  selector: 'cx-fs-potential-assignments',
  templateUrl: './potential-assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:no-host-metadata-property
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: PotentialAssingmensListService,
    },
  ],
})
export class PotentialAssignmentsComponent implements OnInit, OnDestroy {
  constructor(
    protected fsProductAssignmentService: ProductAssignmentService,
    protected currentUnitService: CurrentUnitService
  ) {}

  private subscription = new Subscription();

  unit$: Observable<B2BUnit> = this.currentUnitService
    ? this.currentUnitService.item$
    : of({ active: true });

  ngOnInit(): void {
    this.subscription.add(
      this.unit$
        .pipe(
          map(unit => {
            const parentUnitId = unit.parentOrgUnit
              ? unit.parentOrgUnit.uid
              : unit.uid;
            this.fsProductAssignmentService.loadPotentialProductAssignments(
              parentUnitId
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
