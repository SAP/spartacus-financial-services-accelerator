import { OCC_USER_ID_ANONYMOUS, UserIdService } from '@spartacus/core';
import { MultiCartService } from '@spartacus/cart/base/core';
import { SetActiveCartGuard } from './set-active-cart-guard';
import { FSCartService } from '../../../core/cart/facade/cart.service';
import { FSCart } from '../../../occ/occ-models/occ.models';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

const mockCart: FSCart = {
  guid: 'guid',
};

class MockFSCartService {
  loadCart() {}
  getCart() {
    return of(mockCart);
  }
  setActiveCart() {}
}

class MockUserIdService {
  getUserId() {
    return of(OCC_USER_ID_ANONYMOUS);
  }
}

class MockMultiCartService {
  mergeToCurrentCart() {}
}

describe('SetActiveCartGuard', () => {
  let mockGuard: SetActiveCartGuard;
  let mockFsCartService: FSCartService;
  let mockUserIdService: UserIdService;
  let mockMultiCartService: MultiCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FSCartService, useClass: MockFSCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: MultiCartService, useClass: MockMultiCartService },
      ],
    }).compileComponents();

    mockGuard = TestBed.inject(SetActiveCartGuard);
    mockFsCartService = TestBed.inject(FSCartService);
    mockUserIdService = TestBed.inject(UserIdService);
    mockMultiCartService = TestBed.inject(MultiCartService);
    spyOn(mockGuard, 'setActiveCartForUser').and.callThrough();
    spyOn(mockFsCartService, 'loadCart').and.callThrough();
    spyOn(mockFsCartService, 'getCart').and.callThrough();
    spyOn(mockFsCartService, 'setActiveCart').and.callThrough();
    spyOn(mockMultiCartService, 'mergeToCurrentCart').and.callThrough();
  });

  it(`should not set active cart for user`, () => {
    const route: any = {
      url: [{ path: '/financial/en/EUR/checkout/add-options/' }],
      queryParams: {
        guid: undefined,
      },
    };
    mockGuard
      .canActivate(route)
      .subscribe(_ => {
        expect(mockGuard.setActiveCartForUser).not.toHaveBeenCalled();
      })
      .unsubscribe();
  });

  it(`should set active cart for anonymous user`, () => {
    const route: any = {
      url: [{ path: '/financial/en/EUR/checkout/add-options/' }],
      queryParams: {
        guid: 'testguid',
      },
    };
    mockGuard
      .canActivate(route)
      .subscribe(_ => {
        expect(mockFsCartService.loadCart).toHaveBeenCalled();
        expect(mockFsCartService.getCart).toHaveBeenCalled();
        expect(mockFsCartService.setActiveCart).toHaveBeenCalled();
      })
      .unsubscribe();
  });

  it(`should set active cart for current user`, () => {
    spyOn(mockUserIdService, 'getUserId').and.returnValue(of('current'));
    const route: any = {
      url: [{ path: '/financial/en/EUR/checkout/add-options/' }],
      queryParams: {
        guid: 'testguid',
      },
    };
    mockGuard
      .canActivate(route)
      .subscribe(_ => {
        expect(mockMultiCartService.mergeToCurrentCart).toHaveBeenCalled();
      })
      .unsubscribe();
  });
});
