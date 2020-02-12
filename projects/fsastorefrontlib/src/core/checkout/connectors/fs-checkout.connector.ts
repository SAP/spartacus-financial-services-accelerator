import { Injectable } from '@angular/core';
import { FSCheckoutAdapter } from './fs-checkout.adapter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FsCheckoutConnector {
  constructor(protected adapter: FSCheckoutAdapter) {}

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
