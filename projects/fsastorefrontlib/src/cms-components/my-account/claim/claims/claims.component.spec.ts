import { Component, DebugElement, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By, DomSanitizer } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule, OccConfig, RoutingService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';
import { UserRequestService } from '../../../../core/user-request/facade/user-request.service';
import { DeleteClaimDialogComponent } from './../delete-claim-dialog/delete-claim-dialog.component';
import { ClaimsComponent } from './claims.component';
import createSpy = jasmine.createSpy;

const claimNumber = '000001';
const genericTestIcon = {
  // eslint-disable-next-line max-len
  naIcon:
    'data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSI5NnB4IiBoZWlnaHQ9Ijk2cHgiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgOTYgOTYiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMjYzOTUwIiBkPSJNNzkuOSwzMy4xTDc5LjksMzMuMXYtMmwtMi0wLjVjLTExLjUtMi45LTExLjgtMTMuNy0xMS44LTE0LjIKCQl2LTIuMWwtMi0wLjRjLTAuNC0wLjEtMTAtMi4zLTE2LjMtMi4zYy02LjUsMC0xNiwyLjEtMTYuNSwyLjNsLTIsMC40djIuMWMwLDAuNC0wLjEsMTEuMy0xMS44LDE0LjJsLTIsMC41djIKCQljLTAuMSwwLjQtMC40LDguOSwzLjIsMTkuM2MzLjMsOS43LDEwLjksMjMuMSwyNy44LDMxLjdsMS4yLDAuNmwxLjItMC42YzE2LjgtOC42LDI0LjMtMjIuMSwyNy42LTMxLjdDODAuMyw0Miw4MCwzMy41LDc5LjksMzMuMQoJCUw3OS45LDMzLjF6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI0U5RTlFOSIgZD0iTTQ4LDc5LjdMNDgsNzkuN1Y0OS41aDI0LjNjLTAuMSwwLjgtMC41LDEuNy0wLjgsMi40CgkJQzY3LjQsNjQuMiw1OS4zLDczLjUsNDgsNzkuN0w0OCw3OS43eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNFOUU5RTkiIGQ9Ik0zNC42LDE4LjJMMzQuNiwxOC4yYzMtMC42LDguOS0xLjgsMTMtMS44djMxLjFIMjMuMQoJCWMtMS43LTUuNi0yLTEwLjMtMi4xLTEyLjhDMzAuMywzMS41LDMzLjgsMjMuNSwzNC42LDE4LjJMMzQuNiwxOC4yeiIvPgo8L2c+Cjwvc3ZnPg==',
};

const mockedClaims = {
  claims: [
    {
      claimNumber: claimNumber,
      claimStatus: 'OPEN',
      incidentType: {
        icon: {
          url: 'testURL',
          alt: 'testALT',
        },
        incidentName: 'Theft',
      },
    },
  ],
};

class MockClaimService {
  loadClaims = createSpy();
  resumeClaim = createSpy();

  getClaims() {
    return of(mockedClaims);
  }

  getLoaded() {
    return of(true);
  }

  shouldReload() {
    return of(false);
  }

  getCurrentClaim() {
    return of({
      claimNumber: claimNumber,
      configurationSteps: [
        {
          pageLabelOrId: 'testPage',
        },
      ],
    });
  }
}

class MockUserRequestService {
  resumeRequest = createSpy();
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

@Pipe({
  name: 'parseDate',
})
class MockParseDatePipe implements PipeTransform {
  transform() {}
}

const testBaseUrl = '';

const mockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: testBaseUrl,
      prefix: '',
    },
  },
};

class MockRoutingService {
  go = createSpy();
}

class MockDomSanitizer {
  bypassSecurityTrustUrl = createSpy();
}

const launchDialogService = jasmine.createSpyObj('LaunchDialogService', [
  'openDialog',
]);

describe('ClaimsComponent', () => {
  let component: ClaimsComponent;
  let fixture: ComponentFixture<ClaimsComponent>;
  let claimService: ClaimService;
  let mockUserRequestService: MockUserRequestService;
  let routingService: RoutingService;
  let el: DebugElement;
  let domSanitizer: DomSanitizer;

  beforeEach(
    waitForAsync(() => {
      mockUserRequestService = new MockUserRequestService();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, FormsModule, StoreModule.forRoot({})],
        providers: [
          { provide: ClaimService, useClass: MockClaimService },
          { provide: OccConfig, useValue: mockOccModuleConfig },
          { provide: UserRequestService, useValue: mockUserRequestService },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: DomSanitizer, useClass: MockDomSanitizer },
          {
            provide: LaunchDialogService,
            useValue: launchDialogService,
          },
        ],
        declarations: [
          ClaimsComponent,
          MockCxSpinnerComponent,
          MockParseDatePipe,
        ],
      }).compileComponents();

      routingService = TestBed.inject(RoutingService);
      claimService = TestBed.inject(ClaimService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsComponent);
    domSanitizer = TestBed.inject(DomSanitizer);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(claimService.loadClaims).not.toHaveBeenCalled();
  });

  it('should render claim object', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.info-card-details'))).toBeTruthy();
  });

  it('should render delete icon', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.fs-icon'))).toBeTruthy();
  });

  it('should reload when flag is set to true', () => {
    spyOn(claimService, 'shouldReload').and.returnValue(of(true));
    component.ngOnInit();
    expect(claimService.loadClaims).toHaveBeenCalled();
  });

  it('should delete claim', () => {
    launchDialogService.openDialog.and.callThrough();
    component.deleteClaim(claimNumber);
    expect(launchDialogService.openDialog).toHaveBeenCalled();
  });

  it('should resume claim and redirect', () => {
    spyOn(JSON, 'parse').and.callThrough();
    component.resumeClaim(claimNumber);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not redirect in case claim is not loaded', () => {
    spyOn(claimService, 'getCurrentClaim').and.returnValue(
      of({
        claimNumber: '111',
        configurationSteps: [],
      })
    );
    component.resumeClaim(claimNumber);
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should return base Url from config', () => {
    component.ngOnInit();
    expect(component.baseUrl).toEqual(testBaseUrl);
  });

  it('should have bypassed URL sanitizing for image', () => {
    component.ngOnInit();
    component.getImagelink();
    expect(domSanitizer.bypassSecurityTrustUrl).toHaveBeenCalledWith(
      genericTestIcon.naIcon
    );
  });
});
