import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AuthService,
  Cart,
  CartActions,
  CartDataService,
  CartSelectors,
  CartService,
  StateWithCart,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take, tap, mergeMap, map } from 'rxjs/operators';
import { PricingData } from '../../../models/pricing.interface';
import * as fromFSAction from '../../store/actions/index';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { FSProduct } from '../../../../occ/occ-models';

@Injectable()
export class FSCartService extends CartService {
  protected callbackFunction: Function;
  protected productAddedSource = new BehaviorSubject<string>('');
  public mainProductAdded = this.productAddedSource.asObservable();

  constructor(
    protected fsStore: Store<StateWithCart>,
    protected fsCartData: CartDataService,
    protected fsAuthService: AuthService,
    protected activatedRoute: ActivatedRoute,
    protected categoryService: CategoryService
  ) {
    super(fsStore, fsCartData, fsAuthService);
  }

  addOptionalProduct(
    productCode: string,
    quantity: number,
    entryNumber: string
  ): void {
    this.fsStore.dispatch(
      new fromFSAction.AddOptionalProduct({
        userId: this.fsCartData.userId,
        cartId: this.fsCartData.cartId,
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
    this.fsStore
      .pipe(
        select(CartSelectors.getActiveCartState),
        tap(cartState => {
          if (
            !this.isCartCreated(cartState.value.content) &&
            !cartState.loading
          ) {
            this.fsStore.dispatch(
              new CartActions.CreateCart({ userId: this.cartData.userId })
            );
          }
        }),
        filter(cartState => this.isCartCreated(cartState.value.content)),
        take(1)
      )
      .subscribe(_ => {
        this.fsStore.dispatch(
          new fromFSAction.StartBundle({
            userId: this.fsCartData.userId,
            cartId: this.fsCartData.cartId,
            productCode: productCode,
            bundleTemplateId: bundleTemplateId,
            quantity: quantity,
            pricingData: pricingData,
          })
        );
      });
  }

  loadCart() {
    this.store.dispatch(
      new CartActions.LoadCart({
        cartId: this.fsCartData.cartId,
        userId: this.fsCartData.userId,
      })
    );
  }

  setActiveCategory(): Observable<any> {
    return this.activatedRoute.params.pipe(
      mergeMap(params => {
        return this.getActive().pipe(
          map(cart => {
            const categoryCode = 'categoryCode';
            const formCode = 'formCode';
            if (params[categoryCode]) {
              this.categoryService.setActiveCategory(params[categoryCode]);
            } else if (params[formCode]) {
              this.categoryService.setActiveCategory(params[formCode]);
            } else {
              if (
                cart.deliveryOrderGroups &&
                cart.deliveryOrderGroups.length > 0 &&
                cart.deliveryOrderGroups[0].entries &&
                cart.deliveryOrderGroups[0].entries.length > 0
              ) {
                const fsProduct: FSProduct =
                  cart.deliveryOrderGroups[0].entries[0].product;
                if (fsProduct && fsProduct.defaultCategory) {
                  this.categoryService.setActiveCategory(
                    fsProduct.defaultCategory.code
                  );
                }
              }
            }
          })
        );
      })
    );
  }

  private isCartCreated(cart: Cart): boolean {
    return cart && typeof cart.guid !== 'undefined';
  }
}
