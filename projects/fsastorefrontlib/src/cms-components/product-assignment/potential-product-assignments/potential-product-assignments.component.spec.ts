import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { I18nTestingModule, UserService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ProductAssignmentService } from '../../../core/product-assignment/facade/product-assignment.service';
import { PotentialProductAssignmentsComponent } from './potential-product-assignments.component';

const mockProductAssignments = [
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
];

const mockParams = {
  assignmentGroupParams: 'TestGroup',
};

class ActivatedRouteMock {
  params = of(mockParams);
}

class MockedProductAssignmentService {
  loadProductAssignmentsForUnit(): void {}
  loadPotentialProductAssignments(): void {}
  getPotentialProductAssignments(): Observable<any> {
    return of(mockProductAssignments);
  }
  getProductAssignments(): Observable<any> {
    return of(mockProductAssignments);
  }
  createProductAssignment(): void {}

  removeProductAssignment(): void {}
}

class MockedUserService {
  get() {
    return of('mockUser@user.com');
  }
}

describe('PotentialProductAssignmentsComponent', () => {
  let component: PotentialProductAssignmentsComponent;
  let fixture: ComponentFixture<PotentialProductAssignmentsComponent>;
  let productAssignmentService: ProductAssignmentService;
  let mockedUserService: MockedUserService;

  beforeEach(async(() => {
    mockedUserService = new MockedUserService();
    TestBed.configureTestingModule({
      declarations: [PotentialProductAssignmentsComponent],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock,
        },
        {
          provide: ProductAssignmentService,
          useClass: MockedProductAssignmentService,
        },
        {
          provide: UserService,
          useValue: mockedUserService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialProductAssignmentsComponent);
    component = fixture.componentInstance;
    spyOn(
      productAssignmentService,
      'createProductAssignment'
    ).and.callThrough();
    spyOn(
      productAssignmentService,
      'removeProductAssignment'
    ).and.callThrough();
    productAssignmentService = TestBed.inject(ProductAssignmentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    let result;
    component.availableProductAssignments$
      .subscribe(assignments => (result = assignments))
      .unsubscribe();
    expect(result).toEqual(mockProductAssignments);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    let result;
    component.productAssignments$
      .subscribe(assignments => (result = assignments))
      .unsubscribe();
    expect(result).toEqual(mockProductAssignments);
  });

  it('should assign product', () => {
    component.onAssign('0123456');
    expect(productAssignmentService.createProductAssignment).toHaveBeenCalled();
  });

  it('should deassign product', () => {
    component.onDeassign('SOME_PRODUCT_CODE');
    expect(productAssignmentService.removeProductAssignment).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
