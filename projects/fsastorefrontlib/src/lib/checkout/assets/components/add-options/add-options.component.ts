import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Cart, OrderEntry } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {FSCartService} from '../../services';

@Component({
  selector: 'fsa-add-options',
  templateUrl: './add-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOptionsComponent implements OnInit {

  constructor(
    protected cartService: FSCartService
  ) { }

  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
  }

  addProductToCart(orderEntryCode: string) {
    if (!orderEntryCode) {
      return;
    }
    this.cartService.addOptionalProduct(orderEntryCode, 1);
  }

  removeProductFromCart(item): void {
    if (!item) {
      return;
    }
    this.cartService.removeEntry(item);
  }

}
