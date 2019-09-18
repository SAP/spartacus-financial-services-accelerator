import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CartDataService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as fromFSAction from '../store/actions/index';
import { FSStateWithCheckout, FSCheckoutSelectors } from '../store';

@Injectable()
export class FSCheckoutService {

    constructor(
        protected store: Store<FSStateWithCheckout>,
        protected cartData: CartDataService,
    ) { }

    setIdentificationType(identificationType: string) {
        this.store.dispatch(
            new fromFSAction.SetIdentificationType({
                identificationType: identificationType,
                cartId: this.cartData.cartId,
                userId: this.cartData.userId
            })
        );
        return this.store.pipe(
            select(FSCheckoutSelectors.getIdentificationType)
        );
    }
}
