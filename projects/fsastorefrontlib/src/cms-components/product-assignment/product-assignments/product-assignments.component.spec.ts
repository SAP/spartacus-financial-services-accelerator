import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAssignmentsComponent } from './product-assignments.component';

describe('ProductActivationComponent', () => {
  let component: ProductAssignmentsComponent;
  let fixture: ComponentFixture<ProductAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAssignmentsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
