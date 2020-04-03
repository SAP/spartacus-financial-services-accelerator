import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { UserRequestNavigationService } from '../../core/user-request/facade/user-request-navigation.service';
import { ActivatedRoute } from '@angular/router';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  @Pipe({
    name: 'cxUrl',
  })
  class MockUrlPipe implements PipeTransform {
    transform() {}
  }
  class MockUserRequestNavigationService {
    getActiveStep() {
      let result = {
        sequenceNumber: '1',
      };
      return result;
    }
  }
  class MockActivatedRoute {
    routeConfig = {
      path: 'test',
    };
  }

  let mockUserRequestNavigationService: MockUserRequestNavigationService;
  let mockActivatedRoute: MockActivatedRoute;
  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute();
    mockUserRequestNavigationService = new MockUserRequestNavigationService();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: UserRequestNavigationService,
          useValue: mockUserRequestNavigationService,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
      declarations: [ProgressBarComponent, MockUrlPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set activeIndex', () => {
    expect(component.activeStepIndex).toEqual('1');
  });
});
