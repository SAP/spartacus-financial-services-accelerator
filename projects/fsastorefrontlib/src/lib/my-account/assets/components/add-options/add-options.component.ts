import { Component, OnInit, ChangeDetectionStrategy,Input } from '@angular/core';
import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { CartService, Cart, OrderEntry } from '@spartacus/core';
import { filter } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { FSCartService } from 'projects/fsastorefrontlib/src/lib/my-account/assets/services/fscart.service';
@Component({
  selector: 'fsa-add-options',
  templateUrl: './add-options.component.html',
  styleUrls: ['./add-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOptionsComponent implements OnInit {

  constructor(
    protected cartService: FSCartService,
    private store: Store<fromStore.UserState>,
    private config: OccConfig
  ) {  }

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

  addProductToCart(orderEntryCode:string) {
    if (!orderEntryCode) {
      return;
    }
    this.cartService.addOptionalProduct (orderEntryCode, 1);
  }

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}