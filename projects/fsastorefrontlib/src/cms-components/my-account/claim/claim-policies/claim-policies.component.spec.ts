import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  I18nTestingModule,
  OccConfig,
  OCC_USER_ID_CURRENT,
  TranslationService,
  UserIdService,
} from '@spartacus/core';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';
import { Observable, of } from 'rxjs';

import { ClaimPoliciesComponent } from './claim-policies.component';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { Component, Input } from '@angular/core';
import { Card } from '@spartacus/storefront';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const testBaseUrl = 'testUrl';
const mockImageSrc =
  'data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMTUgMTE1IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMTUgMTE1IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOnVybCgjYSk7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQoJLnN0MntmaWxsOiNFRUVFRUU7fQoJLnN0M3tmaWxsOiMwMDAwMzM7fQoJLnN0NHtmaWxsOiMwMDY2Q0M7fQo8L3N0eWxlPgoKCQoJCTxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjI2OC41IiB4Mj0iMjY4LjUiIHkxPSIxMDEuNSIgeTI9Ii04LjUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIC0xIDMyNiAxMDQpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CgkJPHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgb2Zmc2V0PSIwIi8+CgkJPHN0b3Agc3RvcC1jb2xvcj0iIzAwQjlGMiIgb2Zmc2V0PSIwIi8+CgkJPHN0b3Agc3RvcC1jb2xvcj0iIzAxOUNFMCIgb2Zmc2V0PSIuNTQ5Ii8+CgkJPHN0b3Agc3RvcC1jb2xvcj0iIzBDN0VDRiIgb2Zmc2V0PSIuNzczIi8+CgkJPHN0b3Agc3RvcC1jb2xvcj0iIzE2NjFCRSIgb2Zmc2V0PSIxIi8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iNTcuNSIgY3k9IjU3LjUiIHI9IjU1Ii8+CgkKCQkKCQkJPHBhdGggY2xhc3M9InN0MSIgZD0ibTM4LjkgMjkuMmgyNS42bDEzLjUgMTMuM3Y0MS43YzAgMS4xLTAuOSAxLjktMS45IDEuOWgtMzcuMmMtMS4xIDAtMS45LTAuOS0xLjktMS45di01My4xYzAtMS4xIDAuOS0xLjkgMS45LTEuOXoiLz4KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0ibTY0IDQwLjN2LTExLjVsMTMuNCAxMy40aC0xMS40Yy0xLjEgMC0yLTAuOS0yLTEuOXoiLz4KCQkKCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNDcuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNTMuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNTguMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNjQuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNjkuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNzUuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iODAuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3Q0IiB4PSI0MS41I';
const policyId = 'policy1';
const contractId = 'contract1';
const claimPolicies = {
  claimPoliciesData: {
    insurancePolicies: [
      {
        insuredObjectList: {
          insuredObjects: [
            {
              insuredObjectId: '00000020',
              insuredObjectItems: [
                {
                  changeable: false,
                  label: 'vehicleMake',
                  order: 1,
                  value: 'BMW',
                },
                {
                  changeable: false,
                  label: 'vehicleModel',
                  order: 2,
                  value: '528',
                },
              ],
            },
          ],
        },
        policyNumber: policyId,
        contractNumber: contractId,
      },
    ],
  },
  loaded: true,
};
const mockPolicyObject = {
  insuredObjectList: {
    insuredObjects: [
      {
        insuredObjectItems: [{ value: 1 }, { value: 2 }],
      },
    ],
  },
};
const mockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: testBaseUrl,
      prefix: '',
    },
  },
};

@Component({})
class MockCardComponent {
  @Input()
  border: boolean;
  @Input()
  content: Card;
  @Input()
  fitToContainer: boolean;
  @Output()
  sendCard = new EventEmitter<number>();
}

class MockClaimService {
  getClaimPolicies() {
    return of(mockPolicyObject);
  }
  getClaimPoliciesLoaded() {
    return of(true);
  }
  setSelectedPolicy() {}
  resetSelectedPolicy() {}
}

class MockTranslationService {
  translate(key: string): Observable<string> {
    switch (key) {
      case 'policy.policy':
        return of('Policy');
      case 'fscommon.vehicleMake':
        return of('Vehicle Make');
      case 'fscommon.vehicleModel':
        return of('Vehicle Model');
      case 'fscommon.select':
        return of('Select');
      case 'paymentCard.selected':
        return of('Selected');
      default:
        return of(key);
    }
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockDomSanitizer {
  bypassSecurityTrustUrl() {
    return mockImageSrc;
  }
  sanitize() {}
}

class MockPolicyService {
  loadClaimPolicies() {}
}

describe('ClaimPoliciesComponent', () => {
  let component: ClaimPoliciesComponent;
  let fixture: ComponentFixture<ClaimPoliciesComponent>;
  let mockClaimService: ClaimService;
  let mockUserIdService: UserIdService;
  let mockTranslationService: TranslationService;
  let mockDomSanitizer: DomSanitizer;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        providers: [
          { provide: ClaimService, useClass: MockClaimService },
          { provide: TranslationService, useClass: MockTranslationService },
          { provide: DomSanitizer, useClass: MockDomSanitizer },
          { provide: UserIdService, useClass: MockUserIdService },
          { provide: PolicyService, useClass: MockPolicyService },
          { provide: OccConfig, useValue: mockOccModuleConfig },
        ],
        declarations: [ClaimPoliciesComponent, MockCardComponent],
      }).compileComponents();

      mockClaimService = TestBed.inject(ClaimService);
      mockUserIdService = TestBed.inject(UserIdService);
      mockTranslationService = TestBed.inject(TranslationService);
      mockDomSanitizer = TestBed.inject(DomSanitizer);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimPoliciesComponent);
    component = fixture.componentInstance;
    component.selectedIndex = 0;
    component.selectedPolicyId = policyId;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset selected policy', () => {
    spyOn(mockUserIdService, 'getUserId').and.callThrough();
    component.selectPolicy(undefined, 'policy2', contractId);
    expect(mockUserIdService.getUserId).toHaveBeenCalled();
  });

  it('should select policy', () => {
    spyOn(mockUserIdService, 'getUserId').and.callThrough();
    component.selectPolicy(0, policyId, contractId);
    expect(mockUserIdService.getUserId).toHaveBeenCalled();
  });

  it('should get image link', () => {
    spyOn(mockDomSanitizer, 'bypassSecurityTrustUrl').and.callThrough();
    component.getImagelink();
    expect(mockDomSanitizer.bypassSecurityTrustUrl).toHaveBeenCalled();
  });
});
