import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { Cart, OrderEntry } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {FSCartService} from '../../services';

@Component({
  selector: 'fsa-add-options',
  templateUrl: './add-options.component.html',
  styleUrls: ['./add-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOptionsComponent implements OnInit {

  constructor(
    protected cartService: FSCartService,
    private config: OccConfig
  ) { }

  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
    this.cartLoaded$ = this.cartService.getLoaded();
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

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}
