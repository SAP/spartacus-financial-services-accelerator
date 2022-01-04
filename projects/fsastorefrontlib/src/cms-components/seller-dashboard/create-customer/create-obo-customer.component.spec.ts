import { Component, DebugElement, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MockTranslatePipe,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { DateConfig } from './../../../core/date-config/date-config';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateOBOCustomerComponent } from './create-obo-customer.component';
import { CreateOBOCustomerComponentService } from './create-obo-customer-component.service';
import { Observable, of } from 'rxjs';

const mockUser = {
  email: 'donna@moore.com',
  firstName: 'Donna',
  lastName: 'Moore',
  dateOfBirth: '10-10-1988',
};

const mockForm: FormGroup = new FormGroup({
  email: new FormControl(),
  firstName: new FormControl(),
  lastName: new FormControl(),
  dateOfBirth: new FormControl(),
});
const MockDateConfig: DateConfig = {
  date: {
    format: 'yyyy-mm-dd',
  },
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

class MockCreateOBOCustomerComponentService {
  createCustomerByConsentHolder() {}
}

class MockUserIdService {
  takeUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('CreateOBOCustomerComponent', () => {
  let component: CreateOBOCustomerComponent;
  let fixture: ComponentFixture<CreateOBOCustomerComponent>;
  let el: DebugElement;
  let createOBOCustomerComponentService: CreateOBOCustomerComponentService;
  let mockUserIdService: UserIdService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          CreateOBOCustomerComponent,
          MockCxSpinnerComponent,
          MockTranslatePipe,
          MockUrlPipe,
        ],
        providers: [
          {
            provide: CreateOBOCustomerComponentService,
            useClass: MockCreateOBOCustomerComponentService,
          },
          {
            provide: DateConfig,
            useValue: MockDateConfig,
          },
          { provide: UserIdService, useClass: MockUserIdService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOBOCustomerComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    createOBOCustomerComponentService = TestBed.inject(
      CreateOBOCustomerComponentService
    );

    mockUserIdService = TestBed.inject(UserIdService);
    component.form = mockForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form', () => {
    spyOn(
      createOBOCustomerComponentService,
      'createCustomerByConsentHolder'
    ).and.callThrough();
    component.onSubmit();
    expect(
      createOBOCustomerComponentService.createCustomerByConsentHolder
    ).toHaveBeenCalled();
  });
});
