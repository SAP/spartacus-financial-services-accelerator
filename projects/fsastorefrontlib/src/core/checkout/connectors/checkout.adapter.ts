import { Observable } from 'rxjs';

export abstract class CheckoutAdapter {
  /**
   * Abstract method used to set identification type
   *
   * @param identificationType The identification type
   * @param cartId The code id
   * @param userId The user id
   */
  abstract setIdentificationType(
    identificationType: string,
    cartId: string,
    userId: string
  ): Observable<any>;
}
