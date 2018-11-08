import { Component, Input } from '@angular/core';

@Component({
  selector: 'y-product-details-page-layout',
  templateUrl: './product-details-page-layout.component.html',
  styleUrls: ['./product-details-page-layout.component.scss']
})
export class ProductDetailsPageLayoutComponent {
  @Input()
  productCode;
}
