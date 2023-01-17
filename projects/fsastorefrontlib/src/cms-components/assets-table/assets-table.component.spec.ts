import { SimpleChange } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import { FileService } from '@spartacus/dynamicforms';
import { of } from 'rxjs';
import { ClaimService } from '../../core';
import { AssetTableType } from '../../occ';
import { AssetsTableComponent } from './assets-table.component';

const mockedPolicy: any = {
  policyNumber: 'test1',
  contractNumber: 'test2',
  categoryData: { code: 'insurances_auto' },
};

const mockedAsset = AssetTableType.POLICIES;
const mockedRoutesByAssetType = {
  claims: {
    cxRoute: 'claimDetails',
    params: { claimId: 1 },
  },
  policies: {
    cxRoute: 'policyDetails',
    params: {
      policyId: 2,
      contractId: 3,
    },
  },
  quotes: {
    cxRoute: 'quoteDetails',
    params: { quoteId: 4 },
  },
};

describe('AssetsTableComponent', () => {
  let component: AssetsTableComponent;

  beforeEach(() => {
    const routingServiceSpy = jasmine.createSpyObj<RoutingService>(['go']);
    const fileUploadServiceSpy = jasmine.createSpyObj<FileService>([
      'resetFiles',
    ]);
    const claimServiceSpy = jasmine.createSpyObj<ClaimService>([
      'getCurrentClaim',
      'createClaim',
    ]);
    claimServiceSpy.getCurrentClaim.and.returnValue(
      of({
        configurationSteps: [{ pageLabelOrId: 'test' }],
      })
    );

    TestBed.configureTestingModule({
      providers: [
        AssetsTableComponent,
        {
          provide: RoutingService,
          useValue: routingServiceSpy,
        },
        {
          provide: FileService,
          useValue: fileUploadServiceSpy,
        },
        {
          provide: ClaimService,
          useValue: claimServiceSpy,
        },
        {
          provide: TranslatePipe,
          useClass: MockTranslatePipe,
        },
      ],
      imports: [I18nTestingModule],
    });
  });

  beforeEach(() => {
    component = TestBed.inject(AssetsTableComponent);
    component.ngOnChanges({
      selectedAsset: new SimpleChange(null, 'policies', true),
    });
    component.ngOnInit();
    component.selectedAsset = AssetTableType.POLICIES;
    component.routeByAssetType = mockedRoutesByAssetType;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call startClaim', () => {
    spyOn(component, 'startClaim').and.callThrough();
    component.startClaim(mockedPolicy);
    expect(component.startClaim).toHaveBeenCalledWith(mockedPolicy);
  });

  it('should call resolveAssetUrl', () => {
    spyOn(component, 'resolveAssetUrl').and.callThrough();
    component.resolveAssetUrl(mockedAsset);
    expect(component.resolveAssetUrl).toHaveBeenCalledWith(mockedAsset);
  });

  it('should call resolveIconAction', () => {
    const mockedData = {
      asset: mockedPolicy,
      assetConfig: { startClaim: true },
    };
    spyOn(component, 'resolveIconAction').and.callThrough();
    component.resolveIconAction(mockedData);
    expect(component.resolveIconAction).toHaveBeenCalledWith(mockedData);
  });

  it('should call resolveIconAction else block', () => {
    const mockedData = {
      asset: mockedPolicy,
      assetConfig: { startClaim: false },
    };
    spyOn(component, 'resolveIconAction').and.callThrough();
    component.resolveIconAction(mockedData);
    expect(component.resolveIconAction).toHaveBeenCalledWith(mockedData);
  });

  it('should call ngOnDestroy', () => {
    spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
  });
});
