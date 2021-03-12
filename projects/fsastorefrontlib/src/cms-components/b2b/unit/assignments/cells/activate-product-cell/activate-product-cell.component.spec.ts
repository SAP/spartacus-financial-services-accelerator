import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateProductCellComponent } from './activate-product-cell.component';

describe('ActivateProductCellComponent', () => {
  let component: ActivateProductCellComponent;
  let fixture: ComponentFixture<ActivateProductCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateProductCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateProductCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
