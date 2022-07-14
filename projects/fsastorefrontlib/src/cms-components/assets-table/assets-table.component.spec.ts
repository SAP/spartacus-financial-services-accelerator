import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { FileService } from '@spartacus/dynamicforms';
import { ClaimService } from '../../core/my-account/facade/claim.service';
import { AssetTableType } from '../../occ';

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
  let fileServiceSpy: jasmine.SpyObj<FileService>;
  let claimServiceSpy: jasmine.SpyObj<ClaimService>;
  let fixture: ComponentFixture<AssetsTableComponent>;

  beforeEach(async () => {
    const _fileServiceSpy = jasmine.createSpyObj('FileService', ['resetFiles']);
    const _claimServiceSpy = jasmine.createSpyObj('ClaimService', [
      'createClaim',
      'getCurrentClaim',
    ]);

    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        { provide: FileService, useValue: _fileServiceSpy },
        { provide: ClaimService, useValue: _claimServiceSpy },
      ],
      declarations: [AssetsTableComponent],
    }).compileComponents();

    mockRoutingService = TestBed.inject(RoutingService);
    fileServiceSpy = TestBed.inject(FileService) as jasmine.SpyObj<FileService>;
    claimServiceSpy = TestBed.inject(ClaimService) as jasmine.SpyObj<
      ClaimService
    >;
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
    component.selectedAsset = AssetTableType.QUOTES;

    component.resolveAssetUrl(insuranceQuote1);
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'quoteDetails',
      params: { quoteId: firstQuoteId },
    });
  });
  it('should resolve url and param for POLICY asset', () => {
    component.selectedAsset = AssetTableType.POLICIES;

    component.resolveAssetUrl(insurancePolicy1);
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'policyDetails',
      params: { policyId: firstPolicyNumber, contractId: firstContractNumber },
    });
  });
  it('should resolve url and param for CLAIM asset', () => {
    component.selectedAsset = AssetTableType.CLAIMS;

    component.resolveAssetUrl(claim1);
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'claimDetails',
      params: { claimId: claimId1 },
    });
  });
});
