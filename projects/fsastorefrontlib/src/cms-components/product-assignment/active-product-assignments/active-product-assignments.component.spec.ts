import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {} from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ActiveProductAssignmentsComponent } from './active-product-assignments.component';
import createSpy = jasmine.createSpy;
import { FSProductAssignmentService } from './../../../core/product-assignment/facade/product-assignment.service';

@Component({
  template: '',
  selector: 'fsa-product-assignment-item',
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
  let mockedProductAssignmentService: MockedProductAssignmentService;
  let mockRoutingService: MockRoutingService;

  beforeEach(async(() => {
    mockedProductAssignmentService = new MockedProductAssignmentService();
    mockRoutingService = new MockRoutingService();
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
          provide: FSProductAssignmentService,
          useValue: mockedProductAssignmentService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveProductAssignmentsComponent);
    component = fixture.componentInstance;
    mockedProductAssignmentService = TestBed.get(
      FSProductAssignmentService as Type<FSProductAssignmentService>
    );
    mockRoutingService = TestBed.get(RoutingService as Type<RoutingService>);
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
