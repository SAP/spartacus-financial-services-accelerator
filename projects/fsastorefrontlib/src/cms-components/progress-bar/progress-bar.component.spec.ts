import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { UserRequestNavigationService } from '../../core/user-request/facade/user-request-navigation.service';

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
      return 1;
    }
  }
  let mockUserRequestNavigationService: MockUserRequestNavigationService;
  beforeEach(async(() => {
    mockUserRequestNavigationService = new MockUserRequestNavigationService();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: UserRequestNavigationService,
          useValue: mockUserRequestNavigationService,
        }
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
    // expect(component.activeStepIndex).toEqual('1');
  });
});
