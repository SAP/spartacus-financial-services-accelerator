import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ActiveCartService, AuthService, MultiCartSelectors, MultiCartService, OCC_CART_ID_CURRENT, OCC_USER_ID_ANONYMOUS, StateWithCart, StateWithMultiCart } from '@spartacus/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { PricingData } from '../../../occ/occ-models/form-pricing.interface';
import * as fromFSAction from '../../checkout/store/actions/index';

@Injectable()
export class FSCartService extends ActiveCartService {
  constructor(
    protected fsMultiCartService: MultiCartService,
    protected fsAuthService: AuthService,
    protected activatedRoute: ActivatedRoute,
    protected multiCartStore: Store<StateWithMultiCart>,
    protected fsStore: Store<StateWithCart>,
  ) {
    super(multiCartStore, fsAuthService, fsMultiCartService);
    this.fsAuthService.getOccUserId().subscribe(userId => {
      this.fsUserId = userId;
    });
    this.fsActiveCartId$.subscribe(cartId => {
      if (cartId) {
        console.log(cartId);
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
  private fsCartSelector$ = this.fsActiveCartId$.pipe(
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

  // requireCartCreation() {
  //   return this.fsCartSelector$.pipe(
  //     filter(cartState => !cartState.loading),
  //     take(1),
  //     switchMap(cartState => {
  //       console.log(cartState);
  //       console.log(this.fsCartId);
  //       if (this.fsUserId === OCC_USER_ID_ANONYMOUS || !cartState.value.code) {
  //         console.log('create cart');
  //         this.multiCartService.createCart({
  //           userId: this.fsUserId,
  //           extraData: {
  //             active: true,
  //           },
  //         });
  //       }
  //       return this.fsCartSelector$;
  //     }),
  //     takeLast(1));
  // }
  createCartAndStartBundle(
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ): void {
    // this.requireCartCreation().pipe(
    //   map(cart => console.log(this.fsCartId)),
    //   filter(_ => !this.isTempCartId(this.fsCartId)),
    //   map(cartState => {
    //     console.log(cartState);
    //     console.log(this.fsCartId);
    //     this.multiCartStore.dispatch(
    //       new fromFSAction.StartBundle({
    //         userId: this.fsUserId,
    //         cartId: this.fsCartId,
    //         productCode: productCode,
    //         bundleTemplateId: bundleTemplateId,
    //         quantity: quantity,
    //         pricingData: pricingData,
    //       })
    //     );
    //   })).subscribe();
    this.store
      .pipe(
        select(MultiCartSelectors.getMultiCartState),
        tap(cartState => {
          console.log(cartState);
          console.log(this.fsCartId);
          if (!cartState.active
          ) {
            console.log(cartState.active);
            console.log('create cart');
            this.fsMultiCartService
              .createCart({
                userId: this.fsUserId,
                extraData: {
                  active: true,
                },
              });
          }
        }),
        take(1)
      ).subscribe(_ => {
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
      });
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

  isTempCartId(cartId: string): boolean {
    return cartId.startsWith('temp-');
  }

}
