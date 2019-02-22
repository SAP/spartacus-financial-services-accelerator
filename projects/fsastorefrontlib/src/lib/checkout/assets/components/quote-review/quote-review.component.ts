import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartService, OccConfig } from '@spartacus/core';


@Component({
  selector: 'fsa-quote-review',
  templateUrl: './quote-review.component.html',
  styleUrls: ['./quote-review.component.scss']
})
export class QuoteReviewComponent implements OnInit {

  cart$: Observable<Cart>;
  cartLoaded$: Observable<boolean>;
  product: any;
  targetData: string;

  constructor(
    protected cartService: CartService,
    private config: OccConfig
    ) { }

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.cartLoaded$ = this.cartService.getLoaded();
  }

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }

  getProductInfo(info: string) {
    this.cartService.getActive().subscribe((data) => {
      this.product = data.deliveryOrderGroups[0].entries[0].product;
      this.targetData = info === 'name' ? this.product.categories[0].name : this.product.images[1].url;
    });
    return this.targetData;
  }
}
