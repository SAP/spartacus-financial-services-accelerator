import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BadRequestHandler, GlobalMessageType } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class FSBadRequestHandler extends BadRequestHandler {

  handleError(request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.handleBadPassword(request, response);
    this.handleBadLoginResponse(request, response);
    this.handleValidationError(request, response);
    this.handleGuestDuplicateEmail(request, response);
    this.handleUnknownIdentifierError(request, response);
    this.handleVoucherOperationError(request, response);
  }

  protected handleVoucherOperationError(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    this.getErrors(response)
      .filter(ex => ex.type === 'VoucherOperationError')
      .forEach(ex => {
        if (ex.message === 'coupon.invalid.code.provided') {
          this.globalMessageService.add(
            { key: 'httpHandlers.invalidCodeProvided' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        } else if (ex.message === 'coupon.already.exists.cart') {
          this.globalMessageService.add(
            { key: 'fscommon.httpHandlers.existingCouponCodeProvided' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        }
      });
  }
}
