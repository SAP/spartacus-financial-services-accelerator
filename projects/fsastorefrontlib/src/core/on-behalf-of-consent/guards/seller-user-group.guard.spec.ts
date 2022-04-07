import { TestBed } from '@angular/core/testing';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { FSUser } from '@spartacus/fsa-storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { of } from 'rxjs';
import { SellerUserGroupGuard } from './seller-user-group.guard';
import createSpy = jasmine.createSpy;

const mockUserDetails: FSUser = {
  uid: 'test@tester.com',
  active: true,
};

class MockUserAccountFacade implements Partial<UserAccountFacade> {
  get = createSpy('get').and.returnValue(of(mockUserDetails));
}

class MockGlobalMessageService {
  add() {}
}

class MockRoutingService {
  go() {}
}

describe('SellerUserGroupGuard', () => {
  let routingService: RoutingService;
  let mockedUserAccountFacade: UserAccountFacade;
  let globalMessageService: GlobalMessageService;
  let guard: SellerUserGroupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });
    guard = TestBed.inject(SellerUserGroupGuard);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    mockedUserAccountFacade = TestBed.inject(UserAccountFacade);
    spyOn(routingService, 'go').and.stub();
  });

  it('should return true when seller role found', () => {
    let result: boolean;
    mockUserDetails.roles = ['sellergroup'];

    guard
      .canActivate()
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should return false when customergroup role is found', () => {
    let result: boolean;
    mockUserDetails.roles = ['customergroup'];

    guard
      .canActivate()
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(result).toEqual(false);
  });

  it('should make redirect and show global message when no roles', () => {
    let result: boolean;
    mockUserDetails.roles = [];

    guard
      .canActivate()
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: '/' });
    expect(result).toEqual(false);
  });
});
