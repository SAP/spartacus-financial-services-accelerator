import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';
import { ProductAssignmentsComponent } from './product-assignments.component';

@Component({
  template: '',
  selector: 'cx-fs-product-assignment-item',
})
class ProductAssignmentItemComponent {
  @Input() productAssignment: any;
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
  let mockedProductAssignmentService: ProductAssignmentService;

  beforeEach(
    waitForAsync(() => {
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
            provide: ProductAssignmentService,
            useClass: MockedProductAssignmentService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAssignmentsComponent);
    component = fixture.componentInstance;
    mockedProductAssignmentService = TestBed.inject(ProductAssignmentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    let result;
    component.productAssignments$
      .subscribe(assignments => (result = assignments))
      .unsubscribe();
    expect(result).toEqual(mockProductAssignments);
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
