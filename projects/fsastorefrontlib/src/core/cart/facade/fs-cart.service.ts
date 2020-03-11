import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  ActiveCartService,
  AuthService,
  MultiCartSelectors,
  MultiCartService,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  StateWithMultiCart,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as fromFSAction from '../../checkout/store/actions/index';
import { PricingData } from '../../../occ/occ-models/form-pricing.interface';

@Injectable()
export class FSCartService extends ActiveCartService {
  protected productAddedSource = new BehaviorSubject<string>('');
  constructor(
    protected fsMultiCartService: MultiCartService,
    protected fsAuthService: AuthService,
    protected activatedRoute: ActivatedRoute,
    protected multiCartStore: Store<StateWithMultiCart>
  ) {
    super(multiCartStore, fsAuthService, fsMultiCartService);
    this.fsAuthService.getOccUserId().subscribe(userId => {
      this.fsUserId = userId;
    });
    this.fsActiveCartId$.subscribe(cartId => {
      this.fsCartId = cartId;
    });
  }
  fsUserId: string;
  fsCartId: string;
  fsActiveCartId$ = this.store.pipe(
    select(MultiCartSelectors.getActiveCartId),
    map(cartId => {
      if (!cartId) {
        return OCC_CART_ID_CURRENT;
      }
      this.fsCartId = cartId;
      return cartId;
    })
  );
  fsCartSelector$ = this.fsActiveCartId$.pipe(
    switchMap(cartId => this.multiCartService.getCartEntity(cartId))
  );

  addOptionalProduct(
    productCode: string,
    quantity: number,
    entryNumber: string
  ): void {
    this.multiCartStore.dispatch(
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
    this.fsMultiCartService
      .createCart({
        userId: this.fsUserId,
        extraData: {
          active: true,
        },
      })
      .subscribe(cartState => {
        if (this.isCartCreated(cartState)) {
          this.multiCartStore.dispatch(
            new fromFSAction.StartBundle({
              userId: this.fsUserId,
              cartId: this.fsCartId,
              productCode: productCode,
              bundleTemplateId: bundleTemplateId,
              quantity: quantity,
              pricingData: pricingData,
            })
          );
        }
      });
  }

  private isCartCreated(cartState) {
    return cartState && !cartState.loading && cartState.success;
  }

  loadCart(cartId: string): void {
    if (this.fsUserId !== OCC_USER_ID_ANONYMOUS) {
      this.multiCartService.loadCart({
        userId: this.fsUserId,
        cartId: cartId ? cartId : OCC_CART_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    }
  }
}
