import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProductCellComponent } from './assign-product-cell.component';

describe('AssignProductCellComponent', () => {
  let component: AssignProductCellComponent;
  let fixture: ComponentFixture<AssignProductCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignProductCellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProductCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
