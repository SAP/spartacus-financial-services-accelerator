import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  B2BUserRole,
  I18nTestingModule,
  Title,
  UserService,
} from '@spartacus/core';
import {
  B2BUserService,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { FSUserFormComponent } from './user-form.component';
import { DateConfig } from '../../../../core/date-config/date-config';
import { FSUserItemService } from './user-item.service';
import { UserProfileCoreModule } from '@spartacus/user/profile/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';

const mockForm = new UntypedFormGroup({
  titleCode: new UntypedFormControl(),
  firstName: new UntypedFormControl(),
  lastName: new UntypedFormControl(),
  orgUnit: new UntypedFormGroup({
    uid: new UntypedFormControl(),
  }),
  email: new UntypedFormControl(),
  dateOfBirth: new UntypedFormControl(),
  roles: new UntypedFormArray([]),
});

const MockDateConfig: DateConfig = {
  date: {
    format: 'yyyy-mm-dd',
  },
};

class MockUserService {
  getTitles(): Observable<Title[]> {
    return of();
  }
  loadTitles(): void {}
}

class MockB2BUserService implements Partial<B2BUserService> {
  getAllRoles() {
    return [B2BUserRole.CUSTOMER, B2BUserRole.ADMIN];
  }
}

class MockOrgUnitService {
  getActiveUnitList() {
    return of([]);
  }
  loadList() {}
}

class MockFSItemService {
  getForm() {}
}

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get() {
    return of({});
  }

  getTitles(): Observable<Title[]> {
    return of();
  }

  loadTitles(): void {}
}

describe('FSUserFormComponent', () => {
  let component: FSUserFormComponent;
  let fixture: ComponentFixture<FSUserFormComponent>;
  let b2bUnitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
        UserProfileCoreModule,
      ],
      declarations: [FSUserFormComponent, FormErrorsComponent],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: FSUserItemService, useClass: MockFSItemService },
        { provide: UserService, useClass: MockUserService },
        { provide: B2BUserService, useClass: MockB2BUserService },
        { provide: UserProfileFacade, useClass: MockUserProfileFacade },
        {
          provide: DateConfig,
          useValue: MockDateConfig,
        },
      ],
    }).compileComponents();

    b2bUnitService = TestBed.inject(OrgUnitService);

    spyOn(b2bUnitService, 'getActiveUnitList').and.callThrough();
    spyOn(b2bUnitService, 'loadList').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FSUserFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form controls', () => {
    component.form = mockForm;
    fixture.detectChanges();
    const formControls = fixture.debugElement.queryAll(By.css('input'));
    expect(formControls.length).toBeGreaterThan(0);
  });

  it('should not render any form controls if the form is falsy', () => {
    component.form = undefined;
    fixture.detectChanges();
    const formControls = fixture.debugElement.queryAll(By.css('input'));
    expect(formControls.length).toBe(0);
  });

  it('should set unitKet input', () => {
    component.form = mockForm;
    component.unitKey = 'test unit key';
    fixture.detectChanges();
    const formControls = fixture.debugElement.queryAll(By.css('input'));
    expect(formControls.length).toBeGreaterThan(0);
  });
});
