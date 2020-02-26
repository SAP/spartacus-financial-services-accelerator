import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {} from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { FSProductAssignmentService } from 'projects/fsastorefrontlib/src/core';
import { Observable, of } from 'rxjs';
import { ProductAssignmentsComponent } from './product-assignments.component';

@Component({
  template: '',
  selector: 'fsa-product-assignment-item',
})
class ProductAssignmentItemComponent {
  @Input() productAssignment: any;
  @Input() active: boolean;
  @Input() orgUnitId: string;
}

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

describe('ProductAssignmentsComponent', () => {
  let component: ProductAssignmentsComponent;
  let fixture: ComponentFixture<ProductAssignmentsComponent>;
  let mockedProductAssignmentService: MockedProductAssignmentService;

  beforeEach(async(() => {
    mockedProductAssignmentService = new MockedProductAssignmentService();
    TestBed.configureTestingModule({
      declarations: [
        ProductAssignmentsComponent,
        ProductAssignmentItemComponent,
      ],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock,
        },
        {
          provide: FSProductAssignmentService,
          useValue: mockedProductAssignmentService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAssignmentsComponent);
    component = fixture.componentInstance;
    mockedProductAssignmentService = TestBed.get(
      FSProductAssignmentService as Type<FSProductAssignmentService>
    );
    fixture.detectChanges();
  });

  it('should create', () => {
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
