import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FNOLProgressBarComponent } from './fnol-progress-bar.component';
import { I18nTestingModule } from '@spartacus/core';
import { Pipe, PipeTransform, Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Claim } from '../../../occ/occ-models';
import { UserRequestService } from '../../../core/user-request/facade';
import { ClaimService } from './../../../core/my-account/facade/claim.service';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  // tslint:disable
  selector: 'fsa-progress-bar',
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

describe('FNOLProgressBarComponent', () => {
  let component: FNOLProgressBarComponent;
  let fixture: ComponentFixture<FNOLProgressBarComponent>;
  let mockUserRequestService: MockUserRequestService;
  let mockClaimService: MockClaimService;

  beforeEach(async(() => {
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FNOLProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
