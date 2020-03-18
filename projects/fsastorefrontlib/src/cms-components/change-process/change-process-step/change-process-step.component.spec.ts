import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeProcessStepComponent } from './change-process-step.component';
import { UserRequestNavigationService } from './../../../core/user-request/facade/user-request-navigation.service';
import { ActivatedRoute } from '@angular/router';

const configurationSteps = [
  {
    code: 'step1',
  },
];

class MockUserRequestNavigationService {
  getConfigurationSteps() {
    return configurationSteps;
  }
  getActiveStep() {}
}

describe('ChangeProcessStepComponent', () => {
  let component: ChangeProcessStepComponent;
  let fixture: ComponentFixture<ChangeProcessStepComponent>;
  let mockUserRequestNavigationService: MockUserRequestNavigationService;

  beforeEach(async(() => {
    mockUserRequestNavigationService = new MockUserRequestNavigationService();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserRequestNavigationService,
          useValue: mockUserRequestNavigationService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            routeConfig: {
              path: 'testPath',
            },
          },
        },
      ],
      declarations: [ChangeProcessStepComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProcessStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
