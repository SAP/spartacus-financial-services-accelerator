import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  CellComponent,
  CurrentUnitService,
  ListService,
  MessageService,
} from '@spartacus/organization/administration/components';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductAssignmentService } from '../../../../../../core/product-assignment/facade/product-assignment.service';

@Component({
  selector: 'cx-fs-remove-product-cell',
  templateUrl: './remove-product-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveProductCellComponent<FSProductAssignment>
  extends CellComponent
  implements OnDestroy {
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected productAssignmentService: ProductAssignmentService,
    protected currentUnitService: CurrentUnitService,
    protected organizationSubListService: ListService<FSProductAssignment>,
    protected messageService: MessageService
  ) {
    super(outlet);
  }

  private subscription = new Subscription();
  protected readonly DEASSIGNED_STATE = 'deassigned';
  currentUnit$ = this.currentUnitService.item$;

  removeProduct(unitId, parentUintId) {
    this.productAssignmentService.removeProductAssignment(
      unitId,
      this.model.assignmentCode,
      parentUintId
    );
    this.notify(this.model, this.DEASSIGNED_STATE);
  }

  protected notify(item, state) {
    this.messageService.add({
      message: {
        key: `${this.organizationSubListService.viewType}.${state}`,
        params: {
          item,
        },
      },
    });
  }

  isUnitDefaultOrganizationOfUser(unitId: string): Observable<boolean> {
    return this.productAssignmentService
      .isUserAdminOfUnit(unitId)
      .pipe(map(isUserAdmin => !isUserAdmin));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
