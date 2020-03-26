import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutAdapter } from './checkout.adapter';

@Injectable({
  providedIn: 'root',
})
export class CheckoutConnector {
  constructor(protected adapter: CheckoutAdapter) {}

  setIdentificationType(
    identificationType: string,
    cartId: string,
    userId: string
  ): Observable<any> {
    return this.adapter.setIdentificationType(
      identificationType,
      cartId,
      userId
    );
  }
}
