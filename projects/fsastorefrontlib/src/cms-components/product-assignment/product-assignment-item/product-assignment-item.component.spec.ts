import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ProductAssignmentService } from './../../../core/product-assignment/facade/product-assignment.service';
import { ProductAssignmentItemComponent } from './product-assignment-item.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform() {}
}
class MockedProductAssignmentService {
  changeActiveStatus(): void {}
}

const mockedProductAssignment = {
  active: true,
  code: 'testOne',
  product: {
    name: 'productTestName',
    code: 'testProduct',
    defaultCategory: {
      name: 'testCategory',
    },
  },
};

describe('ProductAssignmentItemComponent', () => {
  let component: ProductAssignmentItemComponent;
  let fixture: ComponentFixture<ProductAssignmentItemComponent>;
  let mockedProductAssignmentService: MockedProductAssignmentService;

  beforeEach(async(() => {
    mockedProductAssignmentService = new MockedProductAssignmentService();
    TestBed.configureTestingModule({
      declarations: [ProductAssignmentItemComponent, MockTranslatePipe],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: ProductAssignmentService,
          useValue: mockedProductAssignmentService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAssignmentItemComponent);
    component = fixture.componentInstance;
    component.orgUnitId = 'SAP';
    component.productAssignment = mockedProductAssignment;
    spyOn(
      mockedProductAssignmentService,
      'changeActiveStatus'
    ).and.callThrough();
    mockedProductAssignmentService = TestBed.inject(
      ProductAssignmentService as Type<ProductAssignmentService>
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change active status', () => {
    component.changeActiveStatus('PA-test');
    expect(
      mockedProductAssignmentService.changeActiveStatus
    ).toHaveBeenCalled();
  });
});
