import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { FSBadRequestHandler } from './bad-request.handler';

const MockRequest = {} as HttpRequest<any>;

const mockCouponInvalidCodeErrorResponse = {
  error: {
    errors: [
      {
        type: 'VoucherOperationError',
        message: 'coupon.invalid.code.provided',
      },
    ],
  },
} as HttpErrorResponse;

const mockCouponExistingCodeErrorResponse = {
  error: {
    errors: [
      {
        type: 'VoucherOperationError',
        message: 'coupon.already.exists.cart',
      },
    ],
  },
} as HttpErrorResponse;

class MockGlobalMessageService {
  add() {}
  remove() {}
}

describe('FSBadRequestHandler', () => {
  let service: FSBadRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FSBadRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(FSBadRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(globalMessageService, 'add');
    spyOn(globalMessageService, 'remove');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle invalid code of coupon', () => {
    service.handleError(MockRequest, mockCouponInvalidCodeErrorResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: `httpHandlers.invalidCodeProvided`,
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle reusing already applied code of coupon ', () => {
    service.handleError(MockRequest, mockCouponExistingCodeErrorResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: `fscommon.httpHandlers.existingCouponCodeProvided`,
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should not handle unreported type of coupon operations', () => {
    const mockCouponGenircErrorResponse = {
      error: {
        errors: [
          {
            type: 'VoucherOperationError',
            message: 'not.specified.message',
          },
        ],
      },
    } as HttpErrorResponse;
    service.handleError(MockRequest, mockCouponGenircErrorResponse);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });
});
