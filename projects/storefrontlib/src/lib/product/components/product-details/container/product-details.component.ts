import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { ProductDetailOutlets } from '../../../product-outlets.model';

@Component({
  selector: 'y-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnChanges {
  static outlets = ProductDetailOutlets;
  @ViewChild('tabSet')
  tabSet;
  @ViewChild('tabSetWrapper')
  tabSetWrapper;
  @Input()
  productCode: string;
  product$: Observable<any>;
  itemCount = 1;

  get outlets() {
    return ProductDetailsComponent.outlets;
  }

  isWritingReview = false;

  constructor(protected productService: ProductService) {}

  ngOnChanges() {
    this.product$ = this.productService.get(this.productCode);
  }

  goToReviews(isWritingReview?: boolean) {
    if (!isWritingReview) {
      this.isWritingReview = false;
    }
    this.tabSet.select('reviews');
    this.tabSetWrapper.nativeElement.scrollIntoView();
  }
}
