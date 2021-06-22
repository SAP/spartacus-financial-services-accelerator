import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentUnitService } from '@spartacus/organization/administration/components';
import { of } from 'rxjs';
import { FSUnitUserCreateComponent } from './unit-user-create.component';

class MockCurrentUnitService {
  key$ = of('testUnit');
}

describe('FSUnitUserCreateComponent', () => {
  let component: FSUnitUserCreateComponent;
  let fixture: ComponentFixture<FSUnitUserCreateComponent>;
  let currentUnitService: CurrentUnitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FSUnitUserCreateComponent],
      providers: [
        {
          provide: CurrentUnitService,
          useClass: MockCurrentUnitService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FSUnitUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    currentUnitService = TestBed.inject(CurrentUnitService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
