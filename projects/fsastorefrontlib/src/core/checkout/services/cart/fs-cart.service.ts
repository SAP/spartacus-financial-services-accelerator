import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AuthService,
  Cart,
  StateWithMultiCart,
  ActiveCartService,
  MultiCartService,
  CartActions,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { filter, take, tap, switchMap } from 'rxjs/operators';
import { PricingData } from '../../../models/pricing.interface';
import * as fromFSAction from '../../store/actions/index';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category/category.service';

@Injectable()
export class FSCartService extends ActiveCartService {
  protected productAddedSource = new BehaviorSubject<string>('');
  constructor(
    protected fsStore: Store<StateWithMultiCart>,
    protected fsMultiCartService: MultiCartService,
    protected fsAuthService: AuthService,
    protected activatedRoute: ActivatedRoute,
    protected categoryService: CategoryService
  ) {
    super(fsStore, fsAuthService, fsMultiCartService);
    this.fsAuthService
      .getOccUserId()
      .subscribe(occUserId => (this.fsUserId = occUserId));
    this.getActiveCartId().subscribe(cartId => (this.fsCartId = cartId));
  }

  fsUserId;
  fsCartId;

  addOptionalProduct(
    productCode: string,
    quantity: number,
    entryNumber: string
  ): void {
    this.fsStore.dispatch(
      new fromFSAction.AddOptionalProduct({
        userId: this.fsUserId,
        cartId: this.fsCartId,
        productCode: productCode,
        quantity: quantity,
        entryNumber: entryNumber,
      })
    );
  }

  createCartAndStartBundle(
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ): void {
    this.getActiveCartId()
      .pipe(
        tap(cartId => {
          if (!cartId) {
            this.multiCartService.createCart({
              userId: this.fsUserId,
              extraData: {
                active: true,
              },
            });
          }
        }),
        switchMap(cartId => this.multiCartService.getCartEntity(cartId)),
        filter(cartState => !cartState.loading),
        filter(cartState => cartState.success || cartState.error),
        take(1)
      )
      .subscribe(state => {
        if (state.value.guid) {
          this.fsCartId = state.value.guid;
          this.fsStore.dispatch(
            new fromFSAction.StartBundle({
              userId: this.fsUserId,
              cartId: state.value.guid,
              productCode: productCode,
              bundleTemplateId: bundleTemplateId,
              quantity: quantity,
              pricingData: pricingData,
            })
          );
        }
      });
  }

  loadCart() {
    this.store.dispatch(
      new CartActions.LoadCart({
        cartId: this.fsCartId,
        userId: this.fsUserId,
      })
    );
  }

}
