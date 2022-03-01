import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { UserRequestService } from '../../../core/user-request/facade';
import { Claim } from '../../../occ/occ-models';
import { ClaimService } from './../../../core/my-account/facade/claim.service';
import { FNOLProgressBarComponent } from './fnol-progress-bar.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  // eslint-disable-next-line
  selector: 'cx-fs-progress-bar',
  template: '',
})
class MockProgressBarComponent {
  @Input() steps;
}

const claimRequest: Claim = {
  requestId: 'test123',
  configurationSteps: [
    {
      name: 'step1',
      pageLabelOrId: 'page1',
      sequenceNumber: '1',
    },
  ],
};

export class MockUserRequestService {
  loadUserRequestFormData() {}
}

export class MockClaimService {
  getCurrentClaim() {
    return of(claimRequest);
  }

  loadUserRequestFormData() {}
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

describe('FNOLProgressBarComponent', () => {
  let component: FNOLProgressBarComponent;
  let fixture: ComponentFixture<FNOLProgressBarComponent>;
  let mockUserRequestService: MockUserRequestService;
  let mockClaimService: MockClaimService;
  let mockLanguageService: LanguageService;

  beforeEach(
    waitForAsync(() => {
      mockUserRequestService = new MockUserRequestService();
      mockClaimService = new MockClaimService();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        declarations: [
          FNOLProgressBarComponent,
          MockUrlPipe,
          MockProgressBarComponent,
        ],
        providers: [
          {
            provide: UserRequestService,
            useValue: mockUserRequestService,
          },
          {
            provide: ClaimService,
            useValue: mockClaimService,
          },
          {
            provide: LanguageService,
            useClass: MockLanguageService,
          },
        ],
      }).compileComponents();
      mockLanguageService = TestBed.inject(LanguageService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FNOLProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
