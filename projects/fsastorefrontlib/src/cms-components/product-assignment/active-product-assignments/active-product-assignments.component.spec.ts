import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {} from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ProductAssignmentService } from './../../../core/product-assignment/facade/product-assignment.service';
import { ActiveProductAssignmentsComponent } from './active-product-assignments.component';
import createSpy = jasmine.createSpy;

@Component({
  template: '',
  selector: 'cx-fs-product-assignment-item',
})
class ProductAssignmentItemComponent {
  @Input() productAssignment: any;
  @Input() active: boolean;
  @Input() orgUnitId: string;
}

class MockRoutingService {
  go = createSpy();
}

const activeProductAssignments = [
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
    return of(activeProductAssignments);
  }
}

describe('ActiveProductAssignmentsComponent', () => {
  let component: ActiveProductAssignmentsComponent;
  let fixture: ComponentFixture<ActiveProductAssignmentsComponent>;
  let mockedProductAssignmentService: ProductAssignmentService;
  let mockRoutingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ActiveProductAssignmentsComponent,
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
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveProductAssignmentsComponent);
    component = fixture.componentInstance;
    mockedProductAssignmentService = TestBed.inject(ProductAssignmentService);
    mockRoutingService = TestBed.inject(RoutingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    let result;
    component.productAssignments$
      .subscribe(assignments => (result = assignments))
      .unsubscribe();
    expect(result).toEqual(activeProductAssignments);
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
