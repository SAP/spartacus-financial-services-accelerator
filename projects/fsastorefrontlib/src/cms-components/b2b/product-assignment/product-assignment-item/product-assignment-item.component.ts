import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade';

@Component({
  selector: 'cx-fs-product-assignment-item',
  templateUrl: './product-assignment-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAssignmentItemComponent {
  @Input() productAssignment: any;
  @Input() orgUnitId: string;
  constructor(protected productAssignmentService: ProductAssignmentService) {}

  changeActiveStatus(productAssignmentCode: string) {
    return this.productAssignmentService.changeActiveStatus(
      this.orgUnitId,
      productAssignmentCode,
      !this.productAssignment.active
    );
  }
}
