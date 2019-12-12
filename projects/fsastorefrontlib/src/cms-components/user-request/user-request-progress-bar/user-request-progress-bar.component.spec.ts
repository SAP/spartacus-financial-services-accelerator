import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestProgressBarComponent } from './user-request-progress-bar.component';
import { I18nTestingModule } from '@spartacus/core';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FSUserRequest } from '../../../occ/occ-models';
import { UserRequestService } from '../../../core/user-request/services';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const mockRequest: FSUserRequest = {
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
  getUserRequest() {
    return of(mockRequest);
  }

  loadUserRequstFormData() {}
}

describe('UserRequestProgressBarComponent', () => {
  let component: UserRequestProgressBarComponent;
  let fixture: ComponentFixture<UserRequestProgressBarComponent>;
  let mockUserRequestService: MockUserRequestService;

  beforeEach(async(() => {
    mockUserRequestService = new MockUserRequestService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [UserRequestProgressBarComponent, MockUrlPipe],
      providers: [
        {
          provide: UserRequestService,
          useValue: mockUserRequestService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
