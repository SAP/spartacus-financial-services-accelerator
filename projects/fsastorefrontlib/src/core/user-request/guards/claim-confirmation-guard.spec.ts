import { ClaimDataService } from '../../my-account/services/claim-data.service';
import { ClaimConfirmationGuard } from './claim-confirmation-guard';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlCommands, RoutingService } from '@spartacus/core';
const claim1 = {
  claimNumber: 'testClaim001',
  claimStatus: 'OPEN',
  requestId: 'testRequest001',
};
const claim2 = {
  claimNumber: 'testClaim002',
  claimStatus: 'APPROVED',
  requestId: 'testRequest002',
};
class MockClaimDataService {
  claimData = claim1;
}
class RoutingServiceStub {
  go(_path: any[] | UrlCommands, _query?: object, _extras?: NavigationExtras) {}
}
describe('ClaimConfirmationGuard', () => {
  let guard: ClaimConfirmationGuard;
  let routing: RoutingService;
  let mockClaimDataService: MockClaimDataService;
  beforeEach(() => {
    mockClaimDataService = new MockClaimDataService();
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: RoutingServiceStub },
        { provide: ClaimDataService, useValue: mockClaimDataService },
      ],
      imports: [RouterTestingModule],
    });
    guard = TestBed.get(ClaimConfirmationGuard as Type<ClaimConfirmationGuard>);
    routing = TestBed.get(RoutingService as Type<RoutingService>);
  });
  it('should not match allowable status', () => {
    let result: boolean;
    guard
      .canActivate()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(false);
  });
  it('should redirect to homepage', () => {
    spyOn(routing, 'go');
    guard
      .canActivate()
      .subscribe()
      .unsubscribe();
    expect(routing.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });
  it('should match allowable status', () => {
    mockClaimDataService.claimData = claim2;
    let result: boolean;
    guard
      .canActivate()
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(true);
  });
});
