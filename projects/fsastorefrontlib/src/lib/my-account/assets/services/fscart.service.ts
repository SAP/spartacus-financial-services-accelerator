import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Cart, OrderEntry } from '@spartacus/core';
import { AuthService, UserToken } from '@spartacus/core';

import * as fromAction from '../store/actions';
import * as fromSelector from '../store/selectors';
import { ANONYMOUS_USERID, CartDataService } from '@spartacus/core';
import { StateWithCart } from 'C:/spartacus/cloud-commerce-spartacus-storefront/projects/core/src/cart/store/cart-state';
import { CartService } from '@spartacus/core';

@Injectable()
export class FSCartService extends CartService {

    constructor(
        private fsStore: Store<StateWithCart>,
        private fsCartData: CartDataService,
        private fsAuthService: AuthService
    ) {
        super(fsStore, fsCartData, fsAuthService);
        this.refresh();
    }

    addOptionalProduct(productCode: string, quantity: number): void {
        console.log("Product code: " + productCode + "; Quantity: " + quantity + "; CartId: " + this.fsCartData.cartId) + "; User" + this.fsCartData.userId;
        this.fsStore.dispatch(
            new fromAction.AddOptionalProduct({
                userId: this.fsCartData.userId,
                cartId: this.fsCartData.cartId,
                productCode: productCode,
                quantity: quantity
            })
        );
    }
}
