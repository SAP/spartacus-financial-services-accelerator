import { Component, DebugElement, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule, OccConfig, RoutingService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';
import { UserRequestService } from '../../../../core/user-request/facade/user-request.service';
import { DeleteClaimDialogComponent } from './../delete-claim-dialog/delete-claim-dialog.component';
import { ClaimsComponent } from './claims.component';
import createSpy = jasmine.createSpy;

const claimNumber = '000001';

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
  // tslint:disable-next-line:component-selector
  selector: 'cx-spinner',
  template: `
    <div>spinner</div>
  `,
})
class MockCxSpinnerComponent {}

@Pipe({
  name: 'parseDate',
})
class MockParseDatePipe implements PipeTransform {
  transform() {}
}

const testBaseUrl = 'testBaseUrl';

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

const modalInstance: any = {
  componentInstance: {
    claimNumber: claimNumber,
  },
};

const modalService = jasmine.createSpyObj('ModalService', ['open']);

describe('ClaimsComponent', () => {
  let component: ClaimsComponent;
  let fixture: ComponentFixture<ClaimsComponent>;
  let claimService: ClaimService;
  let mockUserRequestService: MockUserRequestService;
  let routingService: RoutingService;
  let el: DebugElement;

  beforeEach(async(() => {
    mockUserRequestService = new MockUserRequestService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, FormsModule, StoreModule.forRoot({})],
      providers: [
        { provide: ClaimService, useClass: MockClaimService },
        { provide: OccConfig, useValue: mockOccModuleConfig },
        { provide: UserRequestService, useValue: mockUserRequestService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: ModalService,
          useValue: modalService,
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsComponent);
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
    modalService.open.and.returnValue(modalInstance);
    component.deleteClaim(claimNumber);
    expect(modalService.open).toHaveBeenCalledWith(DeleteClaimDialogComponent, {
      centered: true,
      size: 'lg',
    });
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
    expect(component.getBaseUrl()).toEqual(testBaseUrl);
  });
});
