import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  CellComponent,
  CurrentUnitService,
} from '@spartacus/organization/administration/components';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { ProductAssignmentService } from '../../../../../../core/product-assignment/facade/product-assignment.service';

@Component({
  selector: 'cx-fs-activate-product-cell',
  templateUrl: './activate-product-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateProductCellComponent extends CellComponent
  implements OnDestroy {
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected productAssignmentService: ProductAssignmentService,
    protected currentUnitService: CurrentUnitService
  ) {
    super(outlet);
  }
  private subscription = new Subscription();
  unit$: Observable<string> = this.currentUnitService.b2bUnit$;

  changeActiveStatus(unit: string) {
    this.productAssignmentService.changeActiveStatus(
      unit,
      this.model.assignmentCode,
      !this.model.active
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
