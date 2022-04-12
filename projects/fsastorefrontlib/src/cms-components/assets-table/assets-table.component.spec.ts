import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';

import { AssetsTableComponent } from './assets-table.component';
import createSpy = jasmine.createSpy;

const firstCartCode = 'test001';
const firstQuoteId = 'test001';

const firstPolicyNumber = 'test001';
const firstContractNumber = 'test001';

const claimId1 = 'testClaim001';

const insuranceQuote1: any = {
  cartCode: firstCartCode,
  quoteId: firstQuoteId,
};

const insurancePolicy1: any = {
  policyNumber: firstPolicyNumber,
  contractNumber: firstContractNumber,
};

const claim1 = {
  claimNumber: claimId1,
};

class MockRoutingService {
  go = createSpy();
}

describe('AssetsTableComponent', () => {
  let component: AssetsTableComponent;
  let mockRoutingService: RoutingService;
  let fixture: ComponentFixture<AssetsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
      declarations: [AssetsTableComponent],
    }).compileComponents();

    mockRoutingService = TestBed.inject(RoutingService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve url and param for QUOTE asset', () => {
    component.resolveAssetUrl(insuranceQuote1);
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'quoteDetails',
      params: { quoteId: firstQuoteId },
    });
  });
  it('should resolve url and param for POLICY asset', () => {
    component.resolveAssetUrl(insurancePolicy1);
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'policyDetails',
      params: { policyId: firstPolicyNumber, contractId: firstContractNumber },
    });
  });
  it('should resolve url and param for CLAIM asset', () => {
    component.resolveAssetUrl(claim1);
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'claimDetails',
      params: { claimId: claimId1 },
    });
  });
  it('should NOT resolve url and param for ANY asset', () => {
    component.resolveAssetUrl(undefined);
    expect(mockRoutingService.go).not.toHaveBeenCalled();
  });
});
