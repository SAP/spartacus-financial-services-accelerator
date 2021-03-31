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
import { AssignmentsListService } from './assignments-list.service';

@Component({
  selector: 'cx-fs-assignments',
  templateUrl: './assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:no-host-metadata-property
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: AssignmentsListService,
    },
  ],
})
export class AssignmentsComponent implements OnInit, OnDestroy {
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
            this.productAssignmentService.loadProductAssignmentsForUnit(
              unit.uid
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
