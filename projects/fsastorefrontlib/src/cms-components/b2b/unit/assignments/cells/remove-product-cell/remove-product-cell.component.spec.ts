import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveProductCellComponent } from './remove-product-cell.component';

describe('RemoveProductCellComponent', () => {
  let component: RemoveProductCellComponent;
  let fixture: ComponentFixture<RemoveProductCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveProductCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveProductCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
