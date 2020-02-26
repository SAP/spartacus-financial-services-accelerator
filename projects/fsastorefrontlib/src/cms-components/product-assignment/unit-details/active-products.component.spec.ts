import { PipeTransform, Pipe, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {} from '@angular/router/testing';
import {
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  AuthService,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';

import { Observable, of } from 'rxjs';
import { ActiveProductsComponent } from './active-products.component';
import { FSProductAssignmentService } from '../../../core/product-assignment/facade/product-assignment.service';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform() {}
}

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

const mockProductAssignments = {
  assignments: [
    {
      active: true,
      code: 'testOne',
      product: {
        name: 'productTestName',
        code: 'testProduct',
        defaultCategory: {
          name: 'testCategory',
        },
      },
    },
    {
      active: false,
      code: 'testTwo',
      product: {
        name: 'productTestName',
        code: 'testProduct',
        defaultCategory: {
          name: 'testCategory',
        },
      },
    },
  ],
};

const assignmentGroupParams = 'TestGroup';
const mockParams = {
  assignmentGroupParams: assignmentGroupParams,
};

class ActivatedRouteMock {
  params = of(mockParams);
}

class MockedProductAssignmentService {
  loadProductAssignmentsForUnit(): void {}
  getProductAssignments(): Observable<any> {
    return of(mockProductAssignments);
  }
}

describe('ProductActivationComponent', () => {
  let component: ActiveProductsComponent;
  let fixture: ComponentFixture<ActiveProductsComponent>;
  let authService: MockAuthService;
  let mockedProductAssignmentService: MockedProductAssignmentService;

  beforeEach(async(() => {
    authService = new MockAuthService();
    mockedProductAssignmentService = new MockedProductAssignmentService();
    TestBed.configureTestingModule({
      declarations: [ActiveProductsComponent, MockTranslatePipe],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: FSProductAssignmentService,
          useValue: mockedProductAssignmentService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveProductsComponent);
    component = fixture.componentInstance;
    mockedProductAssignmentService = TestBed.get(
      FSProductAssignmentService as Type<FSProductAssignmentService>
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not load product assignments', () => {
    spyOn(authService, 'getOccUserId').and.returnValue(
      of(OCC_USER_ID_ANONYMOUS)
    );
    component.ngOnInit();
    expect(authService.getOccUserId).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
