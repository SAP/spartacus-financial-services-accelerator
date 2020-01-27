import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, OccConfig, RoutingService } from '@spartacus/core';
import { ClaimsComponent } from './claims.component';
import { ClaimService } from '../../../../core/my-account/services/claim.service';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import createSpy = jasmine.createSpy;
import { Component, Pipe, PipeTransform, DebugElement } from '@angular/core';
import { UserRequestService } from '../../../../core/user-request/services/user-request/user-request.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

const mockedClaims = {
  claims: [
    {
      claimNumber: '000001',
      claimStatus: 'OPEN',
    },
  ],
};

class MockClaimService {
  loadClaims = createSpy();

  getClaims() {
    return of(mockedClaims);
  }

  getLoaded() {
    return of(true);
  }

  shouldReload() {
    return of(false);
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

const MockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

class MockRoutingService {
  go = createSpy();
}

describe('ClaimsComponent', () => {
  let component: ClaimsComponent;
  let fixture: ComponentFixture<ClaimsComponent>;
  let mockClaimService: MockClaimService;
  let mockUserRequestService: MockUserRequestService;
  let el: DebugElement;

  beforeEach(async(() => {
    mockClaimService = new MockClaimService();
    mockUserRequestService = new MockUserRequestService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, FormsModule, StoreModule.forRoot({})],
      providers: [
        { provide: ClaimService, useValue: mockClaimService },
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: UserRequestService, useValue: mockUserRequestService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
      declarations: [
        ClaimsComponent,
        MockCxSpinnerComponent,
        MockParseDatePipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render claim object', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.info-card'))).toBeTruthy();
  });

  it('should render delete icon', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.action-links'))).toBeTruthy();
  });
});
