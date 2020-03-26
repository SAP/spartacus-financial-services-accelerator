import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  ActiveCartService,
  AuthService,
  Cart,
  MultiCartSelectors,
  MultiCartService,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  ProcessesLoaderState,
  StateWithMultiCart,
} from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import { PricingData } from '../../../occ/occ-models/form-pricing.interface';
import * as fromFSAction from '../../checkout/store/actions/index';

@Injectable()
export class FSCartService extends ActiveCartService {
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
      if (cartId) {
        this.fsCartId = cartId;
      }
    });
  }
  fsUserId: string;
  fsCartId: string;
  fsActiveCartId$ = this.store.pipe(
    select(MultiCartSelectors.getActiveCartId),
    map(cartId => {
      if (!cartId) {
        this.loadCart(OCC_CART_ID_CURRENT);
        return OCC_CART_ID_CURRENT;
      }
      this.fsCartId = cartId;
      return cartId;
    })
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

  createCartForProduct(
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ): void {
    if (!this.fsCartId || this.fsCartId === OCC_CART_ID_CURRENT) {
      this.fsMultiCartService
        .createCart({
          userId: this.fsUserId,
          extraData: {
            active: true,
          },
        })
        .pipe(
          filter(cartState => this.isCartCreated(cartState)),
          map(_ => {
            this.startBundleForCart(
              productCode,
              bundleTemplateId,
              quantity,
              pricingData
            );
          })
        )
        .subscribe();
    } else {
      this.startBundleForCart(
        productCode,
        bundleTemplateId,
        quantity,
        pricingData
      );
    }
  }

  startBundleForCart(
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ) {
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

  private isCartCreated(cartState: ProcessesLoaderState<Cart>) {
    return cartState && cartState.success && !cartState.loading;
  }
}
