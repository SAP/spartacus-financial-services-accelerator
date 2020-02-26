import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FSProductAssignmentService } from '../../../core/product-assignment/facade';

@Component({
  selector: 'fsa-product-assignment-item',
  templateUrl: './product-assignment-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAssignmentItemComponent {
  @Input() productAssignment: any;
  @Input() orgUnitId: string;
  constructor(protected productAssignmentService: FSProductAssignmentService) {}

  changeActiveStatus(productAssignmentCode: string) {
    return this.productAssignmentService.changeActiveStatus(
      this.orgUnitId,
      productAssignmentCode,
      !this.productAssignment.active
    );
  }
}
