import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cx-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListItemComponent {
  @Input()
  product;
}
